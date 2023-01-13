const Order = require('../models/order');

require('dotenv').config()

const createOrderService = async (bodyData, userData) => {
    try {
        const newOrder = new Order({
            customerId: userData._id,
            itemId: bodyData.itemId,
            price: bodyData.price,
        });
        await newOrder.save();
        return{
            status:201,
            message:"Success",
            data: newOrder,
        };
    }
    catch (error) {
        return {
            status: 400,
            message: 'Error',
            data: error.message
        }
    }
}

const declineOrderService = async(orderId)=>{
    try {
        let order = await Order.findById(orderId).exec()
        if (!order) {
            return {
                status: 404,
                message:'Error',
                data: "No Order found",
            }
        }
        let updatedOrder = await Order.findOneAndUpdate({_id:orderId}, {"orderStatus":"Declined"}, {
            new: true
        });
        return {
            status: 200,
            message:'Success',
            data: updatedOrder,
        }
    } catch (err) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get an Order with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get an Order with the specified id',
            data: err.message,
        }
    }
}

const approvedOrderService = async(orderId)=>{
    try {
        let order = await Order.findById(orderId).exec()
        if (!order) {
            return {
                status: 404,
                message:'Error',
                data: "No Order found",
            }
        }
        let updatedOrder = await Order.findOneAndUpdate({_id:orderId}, {"orderStatus":"Approved"}, {
            new: true
        });
        return {
            status: 200,
            message:'Success',
            data: updatedOrder,
        }
    } catch (err) {
        if (err.name === 'CastError') {
            return {
                status: 500,
                message: 'Failed to get an Order with the specified id',
                data: err.message,
            }
        }
        return {
            status: 500,
            message: 'Failed to get an Order with the specified id',
            data: err.message,
        }
    }
}

module.exports = {createOrderService, declineOrderService, approvedOrderService }