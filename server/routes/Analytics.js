const express = require("express");
const {getTotalTasks} = require('../controllers/Analytics');
const AnalyticsRouter = express.Router();



AnalyticsRouter.get('/total' , getTotalTasks);




module.exports = AnalyticsRouter;