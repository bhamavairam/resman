
const express = require('express');  
const jwtController = require('./../controllers/jwtcheck')
const projectsController = require('./../controllers/projectsController')
const router = express.Router();

router
    .route('/')
    .post(projectsController.addproject)

router
    .route('/:id')
    .put(projectsController.modifyproject)

router
    .route('/')
    .get(projectsController.getallprojects)

router
    .route('/:id')
    .get(projectsController.getproject_by_id)

module.exports = router;