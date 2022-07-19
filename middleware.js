module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user_id) {
        req.session.returnTo = req.originalUrl;
        return res.redirect('/')
    }
    return next();
}