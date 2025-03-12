const express = require('express');  
const userController = require('./../controllers/userController')
const userprofileController = require('./../controllers/userprofileController')
const userskillController = require('./../controllers/userskillController')
const jwtController = require('./../controllers/jwtcheck')
const router = express.Router();

router
    .route('/signup')
    .post(userController.signup)

router
    .route('/login')
    .post(userController.login)

router
    .route('/profile')
    .post(userprofileController.profile)

router
    .route('/profile/:id')
    .put(jwtController.checkToken, userprofileController.profile)


router
    .route('/skills')
    .post(userskillController.skills)

router
    .route('/skills/:id')
    .put(userskillController.skills)

module.exports = router;