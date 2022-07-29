module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user_id) {
        req.session.returnTo = req.originalUrl;
        return res.redirect('/')
    }
    return next();
}

module.exports.sessionCheckNewUser = (req, res, next) => {
    if (!req.session.newUser) {
        return res.send('No user data available');
    }
    return next();
}

module.exports.sessionCheckUserToDisable = (req, res, next) => {
    if (!req.session.userToDisable) {
        return res.send('No user data available');
    }
    return next();
}