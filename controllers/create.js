const AD = require('ad');
const ldapJs = require('ldapjs');
const nodemailer = require('nodemailer');
const ejs = require('ejs');

const domainUrl = process.env.DOMAIN_URL;
const domainUser = process.env.DOMAIN_USER;
const domainUserPassword = process.env.DOMAIN_USER_PASSWORD;
const domainBaseDN = process.env.DOMAIN_BASE_DN;
const smtpHost = process.env.SMTP_HOST;
const smtpUser = process.env.SMTP_USER;
const smtpUserPassword = process.env.SMTP_USER_PASSWORD;
const emailConfirmationGroup = process.env.EMAIL_CONFIRMATION_GROUP;
const emailSecurityGroup = process.env.EMAIL_SECURITY_GROUP;
const emailTechnologyGroup = process.env.EMAIL_TECHNOLOGY_GROUP;

let message = {
    from: '"User Account Management System" <useraccountmanagement@whitesrfs.org>',
    to: emailConfirmationGroup,
    subject: ``,
    text: ``,
    html: ``
}

const ad = new AD({
    url: domainUrl,
    user: domainUser,
    pass: domainUserPassword,
    baseDN: domainBaseDN
});

const ldapConfig = {
    url: domainUrl,
    connectionTimeOut: 30000,
    reconnect: true
}

const ldapClient = ldapJs.createClient(ldapConfig);

ldapClient.on('error', function (err) {
    console.log(err);
})

const smtpConfig = {
    host: smtpHost,
    port: 25,
    secure: false,
    auth: {
        user: smtpUser,
        pass: smtpUserPassword
    }
}

async function sendMail(message) {
    try {
        let transporter = nodemailer.createTransport(smtpConfig);
        let info = await transporter.sendMail(message);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.renderNewUserForm = (req, res) => {
    res.render('create/create', { error: false })
}

module.exports.createNewUser = (req, res) => {

    // Bind LDAP with server

    ldapClient.bind(domainUser, domainUserPassword, async (err) => {
        if (err) {
            console.log(err);
            return res.send('Something went wrong with binding LDAP');
        } else {

            // Destructure new user info from req.body.newUser

            console.log('Bind complete');
            const { firstName, lastName, emailDomain, office, jobTitle, supervisorEmail } = req.body.newUser;
            let userName = `${firstName}.${lastName}`;
            userName = userName.replace(/\s+/g, '');
            userName = userName.slice(0, 20);
            const commonName = `${firstName} ${lastName}`
            let email = userName.toLowerCase() + emailDomain;
            email = email.replace(/\s+/g, '');
            const organizationalUnit = 'OU=Users,OU=IT Dept,DC=whitesrfs,DC=loc'
            const distinguishedName = `CN=${firstName} ${lastName},OU=Users,OU=${office},DC=whitesrfs,DC=loc`
            let newUserPassword = process.env.NEW_USER_PASSWORD;

            // Find template to copy from 

            const templateUser = await ad.user(jobTitle).get();

            const description = templateUser.description;
            const groups = templateUser.groups.map(groupArray => groupArray.cn);

            //create newUser object for AD

            const newUser = {
                cn: commonName,
                sn: lastName,
                mail: email,
                objectClass: 'user',
                userPrincipalName: email,
                sAMAccountName: userName,
                givenName: firstName,
                displayName: commonName,
                userAccountControl: 544,
                description
            }

            // Async to add user to groups

            async function iterateOverGroups(groups) {
                for (let group of groups) {
                    await ad.user(newUser.sAMAccountName).addToGroup(group)
                }
            };

            // Object to pass to the Success page

            const newUserFullDetails = {
                firstName,
                lastName,
                email,
                office,
                jobTitle,
                distinguishedName,
                commonName,
                groups,
                description,
                supervisorEmail
            };

            req.session.newUser = newUserFullDetails;

            const userExists = await ad.user(userName).exists();

            if (!userExists) {
                // If the user doesn't exist try to add new user to Active Directory
                ldapClient.add(distinguishedName, newUser, err => {
                    if (err) {
                        console.log(err);
                        console.log(distinguishedName, newUser)
                        ldapClient.unbind();
                        console.log('Unbind complete');
                        return res.send('Something went wrong with adding the new user');
                    } else {
                        //After successsful user creation

                        console.log('Successfully created new user', newUser)

                        // Add user to groups
                        iterateOverGroups(groups)
                            .then(async (result) => {
                                ldapClient.unbind();
                                console.log('Unbind complete');
                                // Generate email notification
                                const successTemplate = 'views/emailTemplates/success.ejs'
                                newUserFullDetails.author = req.session.authorFullDetails;
                                req.session.newUserFullDetails = newUserFullDetails;
                                console.log(newUserFullDetails);
                                await ejs.renderFile(successTemplate, { newUserFullDetails }, async (err, html) => {
                                    currentUser = newUserFullDetails.author.cn;
                                    message = {
                                        from: '"User Account Management System" <useraccountmanagement@whitesrfs.org>',
                                        to: emailConfirmationGroup,
                                        subject: `An account has been created for ${newUser.cn}`,
                                        text: `An account has successfully been created for ${newUser.cn}. Created by ${currentUser}`,
                                        html
                                    }
                                    sendMail(message);
                                    return res.redirect('create/success')
                                })

                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                })
            } else {
                //If the user already exists, notify the creator

                console.log(`The user ${userName} already exists!`);
                ldapClient.unbind();
                console.log('Unbind complete');
                return res.redirect('create/duplicate');

            }
        }
    })
}

module.exports.success = (req, res) => {
    newUser = req.session.newUser;
    res.render('create/success');
}

module.exports.duplicate = (req, res) => {
    const duplicateUser = req.session.newUser;
    res.render('create/duplicate', { duplicateUser });
}

module.exports.renderDisableForm = (req, res) => {
    res.render('create/disable');
}

module.exports.disableUserAccount = async (req, res) => {
    ldapClient.bind(domainUser, domainUserPassword, async (err) => {
        if (err) console.log(err);
        const { sAMAccountName } = req.session.userToDisable;
        try {
            if (req.body.disable.cn === req.session.userToDisable.cn) {
                accountToDisable = await ad.user(sAMAccountName).get();
                const successfullyDisabled = await ad.user(sAMAccountName).disable();
                ldapClient.unbind();

                // Generate email notification 

                const disabledTemplate = 'views/emailTemplates/accountDisabled.ejs';
                accountToDisable.author = req.session.authorFullDetails;
                req.session.disabledAccount = accountToDisable;

                await ejs.renderFile(disabledTemplate, { accountToDisable }, async (err, html) => {
                    message = {
                        from: '"User Account Management System" <useraccountmanagement@whitesrfs.org>',
                        to: emailConfirmationGroup,
                        subject: `${accountToDisable.sAMAccountName} has been disabled`,
                        text: `The account for ${accountToDisable.sAMAccountName} has been disabled by ${accountToDisable.author.cn}`,
                        html
                    }
                    sendMail(message);
                    return res.redirect('accountDisabled')
                })
            }
        } catch (err) {
            console.log(`Unable to disable user ${sAMAccountName}`)
            console.log(err);
            return res.send('Something went wrong disabling the account')
        }
    })
}

module.exports.confirmDisableUserAccount = (req, res) => {
    ldapClient.bind(domainUser, domainUserPassword, async (err) => {
        if (err) console.log(err);
        const { userName } = req.body.disable;
        try {
            const userExists = await ad.user(userName).exists();
            if (!userExists) { throw `${userName} does not exist` };
            const userToDisable = await ad.user(userName).get();
            console.log(userToDisable);
            req.session.userToDisable = userToDisable;
            ldapClient.unbind();
            return res.redirect('confirmDisable')
        } catch (err) {
            console.log(`Unable to find user ${userName}`)
            console.log(err);
            ldapClient.unbind();
            return res.redirect('disable')
        }
    })
}

module.exports.renderConfirmDisable = (req, res) => {
    const userToDisable = req.session.userToDisable;
    res.render('create/confirmDisable', { userToDisable })
}

module.exports.accountDisabled = (req, res) => {
    const disabledAccount = req.session.disabledAccount;
    res.render('create/accountDisabled', { disabledAccount });
}

module.exports.renderTechnologyRequestForm = (req, res) => {
    newUserFullDetails = req.session.newUserFullDetails || { commonName: 'Example User' };
    res.render('create/technologyRequest', { newUserFullDetails });
}