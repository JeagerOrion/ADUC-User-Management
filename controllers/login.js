const ActiveDirectory = require('activedirectory');
const activeDirectoryConfig = {
    url: process.env.DOMAIN_URL,
    baseDN: process.env.DOMAIN_BASE_DN,
    // username: process.env.ADMIN,
    bindDN: process.env.DOMAIN_BIND_DN,
    password: process.env.DOMAIN_USER_PASSWORD
}

const ad = new ActiveDirectory(activeDirectoryConfig);

const groupName = process.env.AUTHORIZED_AD_GROUP;

module.exports.renderLoginForm = (req, res) => {
    res.render('login/login')
}

module.exports.authenticate = (req, res) => {
    const { username, password } = req.body.login;
    appendedUsername = username + '@whitesrfs.org';
    ad.isUserMemberOf(appendedUsername, groupName, function (err, isMember) {
        if (err) {
            console.log(err);
            console.log(appendedUsername + ' isMemberOf ' + groupName + ': ' + isMember);
            return res.send('Something went wrong with group authentication');
        }
        if (isMember === true) {
            console.log(`User: ${username} has logged in`);
            req.session.user_id = username;
            return res.redirect('home');
        }
        if (isMember === false) {
            return res.send('You are not authorized to use this system.')
        }
    })
}

module.exports.logout = (req, res) => {
    userLoggingOff = req.session.user_id;
    req.session.user_id = undefined;
    console.log(`${userLoggingOff} has logged off`)
    return res.redirect('login/login');
}

module.exports.homePage = (req, res) => {
    res.render('login/home')
}