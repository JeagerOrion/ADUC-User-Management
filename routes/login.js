const express = require('express');
const router = express.Router();
const login = require('../controllers/login')
const { isLoggedIn } = require('../middleware');

router.route('/')
    .get(login.renderLoginForm)
    .post(login.authenticate)

router.get('/home', isLoggedIn, login.homePage);

router.post('/logout', isLoggedIn, login.logout);

router.get('/unauthorized', login.unauthorizedPage);

module.exports = router