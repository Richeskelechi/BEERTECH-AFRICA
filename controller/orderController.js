const { createOrderService, declineOrderService, approvedOrderService } = require('../services/orderService')

const createOrderController = async (req, res) => {
    try {
        if(req.user){
            const response = await createOrderService(req.body, req.user)
            return res.status(response.status).json(response)
        }else{
            return res.status(401).json({
                status:401,
                message: "Unauthorized User. Please Login."
            })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

const declineOrderController = async (req, res) => {
    try {
        const {id:orderId} = req.params
        if(orderId){
            const response = await declineOrderService(orderId)
            return res.status(response.status).json(response)
        }else{
            return res.status(404).json({
                status:404,
                message:"Error",
                data:"Order Id Is required"
            })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

const approveOrderController = async (req, res) => {
    try {
        const {id:orderId} = req.params
        if(orderId){
            const response = await approvedOrderService(orderId)
            return res.status(response.status).json(response)
        }else{
            return res.status(404).json({
                status:404,
                message:"Error",
                data:"Order Id Is required"
            })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { createOrderController, declineOrderController, approveOrderController}