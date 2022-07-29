module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user_id) {
        req.session.returnTo = req.originalUrl;
        return res.redirect('/')
    }
    return next();
}

module.exports.sessionCheckNewUser = (req, res, next) => {
    if (!req.session.newUser) {
        req.flash('error', 'No user data available');
        return res.redirect('/home');
    }
    return next();
}

module.exports.sessionCheckUserToDisable = (req, res, next) => {
    if (!req.session.userToDisable) {
        req.flash('error', 'No user data available');
        return res.redirect('/home');
    }
    return next();
}

module.exports.blockLoginPage = (req, res, next) => {
    if (req.session.user_id) {
        return res.redirect('/home');
    }
    return next();
}