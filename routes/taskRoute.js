const express=require('express')
const taskController = require('../controller/taskController');
const authentication = require('../middleware/AuthenticationVerify');

const router=express.Router()

router.post('/createTask',authentication.tokenVerify,authentication.adminVerify,taskController.createTask)
router.delete('/deleteTask/:id',authentication.tokenVerify,authentication.adminVerify, taskController.deleteTask);
router.put('/updateTask/:id',authentication.tokenVerify,authentication.adminVerify,taskController.updateTask);
router.post('/assignTask',authentication.tokenVerify,authentication.adminVerify,taskController.assignTask)
router.get('/taskAssignedOneUser/:id',authentication.tokenVerify,authentication.adminVerify,taskController.getTaskAssignToOneUser)
router.get('/getAllTask',authentication.tokenVerify,authentication.adminVerify,taskController.getAllTasks)

router.get('/getTasksOfuser',authentication.tokenVerify,taskController.getTasksOfuser)

router.get('/filterTask',authentication.tokenVerify,taskController.filterTask)
router.get('/searchTask',authentication.tokenVerify,taskController.searchTask)


module.exports=router;