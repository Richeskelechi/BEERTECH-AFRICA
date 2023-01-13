const express = require('express');
const orderRouter = express.Router();
const { createOrderController, updateOrderController } = require('../controllers/orderController')
const { checkToken } = require('../middlewares/checkToken')

orderRouter.post('/create', createOrderController)
orderRouter.post('/update', updateOrderController)

module.exports = orderRouter