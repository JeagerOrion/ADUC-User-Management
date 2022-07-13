const express = require('express');
const router = express.Router();
const login = require('../controllers/login')

router.route('/')
    .get(login.renderLoginForm)
    .post(login.authenticate)

router.post('/logout', login.logout);

module.exports = router