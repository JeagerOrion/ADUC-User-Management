const express = require('express');
const router = express.Router();
const login = require('../controllers/login')
const { isLoggedIn, blockLoginPage } = require('../middleware');

router.route('/')
    .get(blockLoginPage, login.renderLoginForm)
    .post(blockLoginPage, login.authenticate)

router.get('/home', isLoggedIn, login.homePage);

router.post('/logout', isLoggedIn, login.logout);

router.get('/unauthorized', login.unauthorizedPage);

module.exports = router