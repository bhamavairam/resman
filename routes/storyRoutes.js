
const express = require('express');  
const jwtController = require('./../controllers/jwtcheck')
const storyController = require('./../controllers/storyController')
const router = express.Router();

router
    .route('/')
    .post(storyController.addstory)

router
    .route('/:id')
    .put(storyController.modifystory)

router
    .route('/')
    .get(storyController.getallstories)

router
    .route('/:id')
    .get(storyController.getuserstories)

module.exports = router;