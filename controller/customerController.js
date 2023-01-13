const { createCustomerService, loginCustomerService } = require('../services/customerService')
const signupUserController = async (req, res) => {
    try {
        const response = await createCustomerService(req.body)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const loginUserController = async (req, res) => {
    try {
        const response = await loginCustomerService(req.body)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = { signupUserController, loginUserController}