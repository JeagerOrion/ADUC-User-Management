const express = require('express');
const router = express.Router();
const create = require('../controllers/create');
const { isLoggedIn, sessionCheckNewUser, sessionCheckUserToDisable } = require('../middleware');

// isLoggedIn, 

router.route('/')
    .get(isLoggedIn, create.renderNewUserForm)
    .post(isLoggedIn, create.createNewUser)

router.get('/success', isLoggedIn, sessionCheckNewUser, create.success);

router.get('/duplicate', isLoggedIn, sessionCheckNewUser, create.duplicate);

router.route('/disable')
    .get(isLoggedIn, create.renderDisableForm)
    .post(isLoggedIn, sessionCheckUserToDisable, create.disableUserAccount)

router.get('/accountDisabled', isLoggedIn, sessionCheckUserToDisable, create.accountDisabled)

router.route('/confirmDisable')
    .get(isLoggedIn, sessionCheckUserToDisable, create.renderConfirmDisable)
    .post(isLoggedIn, create.confirmDisableUserAccount)

router.route('/technologyRequest')
    .get(isLoggedIn, create.renderTechnologyRequestForm)


module.exports = router;