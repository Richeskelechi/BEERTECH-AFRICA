const express = require('express');
const orderRouter = express.Router();
const { createOrderController, declineOrderController, approveOrderController  } = require('../controller/orderController')
const { checkToken } = require('../middlewares/checkToken')

orderRouter.post('/create', checkToken, createOrderController)
orderRouter.put('/decline/:id', declineOrderController)
orderRouter.put('/approve/:id', approveOrderController)

module.exports = orderRouter