const express = require("express");
const {AddNewTask , GetTask, UpdateStatus , DeleteTask} = require('../controllers/Task')
const TaskRouter = express.Router();


TaskRouter.post('/at' ,AddNewTask);

TaskRouter.get('/gt' ,GetTask);


TaskRouter.put('/ut/:id', UpdateStatus);

TaskRouter.delete('/dt/:id', DeleteTask);




module.exports = TaskRouter;