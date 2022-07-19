const express = require('express');
const router = express.Router();
const create = require('../controllers/create');
const { isLoggedIn } = require('../middleware');

// isLoggedIn, 

router.route('/')
    .get(create.renderNewUserForm)
    .post(create.createNewUser)

router.get('/success', create.success);

router.get('/duplicate', create.duplicate);

router.route('/disable')
    .get(create.renderDisableForm)
    .post(create.disableUserAccount)

router.get('/accountDisabled', create.accountDisabled)

router.route('/confirmDisable')
    .get(create.renderConfirmDisable)
    .post(create.confirmDisableUserAccount)


module.exports = router;