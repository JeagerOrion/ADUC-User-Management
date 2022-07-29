const AD = require('ad');
const ldapJs = require('ldapjs');

const domainUrl = process.env.DOMAIN_URL;
const domainUser = process.env.DOMAIN_USER;
const domainUserPassword = process.env.DOMAIN_USER_PASSWORD;
const domainBaseDN = process.env.DOMAIN_BASE_DN;
const authorizedAccessGroup = process.env.AUTHORIZED_AD_GROUP;

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


module.exports.renderLoginForm = (req, res) => {
    res.render('login/login')
}

module.exports.authenticate = async (req, res) => {
    const { username, password } = req.body.login;
    appendedUsername = username + '@whitesrfs.org';
    const isMember = await ad.user(username).isMemberOf(authorizedAccessGroup);
    if (isMember === true) {
        try {
            const isAuthenticated = await ad.user(username).authenticate(password);
            if (isAuthenticated === true) {
                try {
                    const authorFullDetails = await ad.user(username).get();
                    const authorCommonName = authorFullDetails.cn;
                    req.session.authorFullDetails = authorFullDetails;
                    console.log(`User: ${authorCommonName} has logged in`);
                    req.session.user_id = username;
                    const redirectUrl = req.session.returnTo || 'home';
                    return res.redirect(redirectUrl);
                }
                catch (err) {
                    console.log(err)
                }
            }
            if (isAuthenticated === false) {
                console.log(`Failed sign in attempt for ${username}`);
                req.flash('error', 'Incorrect username or password');
                return res.redirect('/');
            }
        }
        catch (err) {
            console.log('isTrue catch')
            console.log(err);
            return res.send(err);
        }
    }
    if (isMember === false) {
        console.log(`Unauthorized access attempt from ${username}`)
        return res.render('login/unauthorized')
    }
}

module.exports.logout = (req, res) => {
    userLoggingOut = req.session.user_id;
    req.session.user_id = undefined;
    console.log(`${userLoggingOut} has logged out`)
    return res.redirect('/');
}

module.exports.homePage = (req, res) => {
    res.render('login/home')
}

module.exports.unauthorizedPage = (req, res) => {
    res.render('login/unauthorized');
}