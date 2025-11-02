const express = require("express");
const UserRouter = express.Router();
const {SignUpUser , LoginUser} = require('../controllers/User')


UserRouter.post('/signup' , SignUpUser);
UserRouter.post('/login' , LoginUser);



module.exports = UserRouter;