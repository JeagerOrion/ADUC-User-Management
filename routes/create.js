const express = require('express');
const router = express.Router();
const create = require('../controllers/create');
const { isLoggedIn } = require('../middleware');

router.route('/')
    .get(isLoggedIn, create.renderNewUserForm)
    .post(create.createNewUser)

module.exports = router;