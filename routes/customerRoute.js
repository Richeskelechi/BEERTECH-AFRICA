const express = require('express');
const customerRouter = express.Router();
const { signupUserController, loginUserController } = require('../controllers/customerController')

customerRouter.post('/signup', signupUserController)
customerRouter.post('/login', loginUserController)

module.exports = customerRouter