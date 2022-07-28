const express = require('express');
const router = express.Router();
const create = require('../controllers/create');
const { isLoggedIn } = require('../middleware');

// isLoggedIn, 

router.route('/')
    .get(isLoggedIn, create.renderNewUserForm)
    .post(isLoggedIn, create.createNewUser)

router.get('/success', isLoggedIn, create.success);

router.get('/duplicate', isLoggedIn, create.duplicate);

router.route('/disable')
    .get(isLoggedIn, create.renderDisableForm)
    .post(isLoggedIn, create.disableUserAccount)

router.get('/accountDisabled', isLoggedIn, create.accountDisabled)

router.route('/confirmDisable')
    .get(isLoggedIn, create.renderConfirmDisable)
    .post(isLoggedIn, create.confirmDisableUserAccount)

router.route('/technologyRequest')
    .get(isLoggedIn, create.renderTechnologyRequestForm)


module.exports = router;