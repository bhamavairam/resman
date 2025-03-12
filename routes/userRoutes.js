const express = require('express');  
const userController = require('./../controllers/userController')
const userprofileController = require('./../controllers/userprofileController')
const userskillController = require('./../controllers/userskillController')
const jwtController = require('./../controllers/jwtcheck')
const router = express.Router();

router.route('/')
      .get(jwtController.checkToken, userController.getallusers)

router
    .route('/signup')
    .post(userController.signup)

router
    .route('/login')
    .post(userController.login)

router
    .route('/profile')
    .post(jwtController.checkToken, userprofileController.profile)

router
    .route('/profile/:id')
    .put(jwtController.checkToken, userprofileController.profile)

router
    .route('/profile/:id')
    .get(jwtController.checkToken,userprofileController.get_profile_by_user_id)

router
    .route('/skills')
    .post(userskillController.addskill)

router
    .route('/skills/:id')
    .put(userskillController.modifyskill)

router
    .route('/skills/:id')
    .get(userskillController.get_skill_by_user_id)

module.exports = router;