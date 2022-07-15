const express = require('express');
const router = express.Router();
const create = require('../controllers/create');
const { isLoggedIn } = require('../middleware');

router.route('/')
    .get(isLoggedIn, create.renderNewUserForm)
    .post(create.createNewUser)

router.get('/success', create.success);

router.get('/duplicate', create.duplicate);

router.route('/disable')
    .get(create.renderDisableForm)
    .post(create.disableUserAccount)

router.post('/confirmDisable', create.confirmDisableUserAccount);

module.exports = router;