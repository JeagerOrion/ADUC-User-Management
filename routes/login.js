const express = require('express');
const router = express.Router();
const login = require('../controllers/login')

router.route('/')
    .get(login.renderLoginForm)
    .post(login.authenticate)

module.exports = router