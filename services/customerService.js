const Customer = require('../models/customer');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config()

JWT_SECRET = process.env.JWT_SECRET;

const createCustomerService = async (req) => {
    try {
        const customer = await Customer.findOne({ email: req.email });
        if (customer) {
            return{
                status:400,
                message:"Error",
                data: 'Email Provided Already Exists. Check The Email And Try Again' 
            };
        }
        const newCustomer = new Customer({
            fullName: req.fullName,
            email: req.email,
            phoneNumber: req.phoneNumber,
            password: req.password
        });
        const hashedPassword = await bcrypt.hash(newCustomer.password, +process.env.SALT_ROUNDS);
        newCustomer.password = hashedPassword;
        await newCustomer.save();
        newCustomer.password = undefined;
        return{
            status:201,
            message:"Success",
            data: newCustomer
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

const loginCustomerService = async (req)=>{
    try {
        const {email, password} = req
        const exist = await Customer.findOne({email}).exec()
        if(!exist){
            return {
                status:400,
                message:'Error',
                data:'Customer Email does not exist. Please Check the Email And try again'
            }
        }

        const isMatch = await bcrypt.compare(password, exist.password)
        if(!isMatch){
            return {
                status:400,
                message:'Error',
                data:'Invalid Email or Password'
            }
        }

        const token = jwt.sign({id:exist._id}, JWT_SECRET, {expiresIn:'1h'})
        exist.password = undefined;
        return {
            status: 200,
            message: 'Success',
            userToken:token,
            data:exist
        }

    }catch (err) {
        return {
            status: 400,
            message: 'Error',
            data: err.message
        }
    }
}

module.exports = {createCustomerService, loginCustomerService}