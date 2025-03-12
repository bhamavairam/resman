
const express = require('express');  
const jwtController = require('./../controllers/jwtcheck')
const tasksController = require('./../controllers/tasksController')
const router = express.Router();

router
    .route('/')
    .post(tasksController.addtask)

router
    .route('/assign')
    .post(tasksController.assigntask)


router
    .route('/:id')
    .put(tasksController.modifytask)

router
    .route('/:id')
    .get(tasksController.get_task_by_id)

router
    .route('/')
    .get(tasksController.getalltasks)


router
    .route('/usertasks')
    .get(tasksController.usertask)

module.exports = router;