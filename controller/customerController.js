const User = require('../models/Users');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config()

JWT_SECRET = process.env.JWT_SECRET;

const signupUserController = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ msg: 'Email Provided Already Exists. Check The Email And Try Again' });
        }
        const newUser = new User({
            fullName: req.body.fullname,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            country: req.body.country,
            state: req.body.state,
            password: req.body.password
        });
        const hashedPassword = await bcrypt.hash(newUser.password, +process.env.SALT_ROUNDS);
        newUser.password = hashedPassword;
        await newUser.save();
        newUser.password = undefined;
        res.status(201).json({ msg: 'User Created Successfully', data: newUser });
    }
    catch (error) {
        res.status(500).json({ msg: error });
        console.log(error);
    }
}

const loginUserController = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ msg: 'User Does Not Exist' });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Email or Password' });
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        user.password = undefined;
        res.status(200).json({ msg: 'User Logged In Successfully', data: user, userToken: token });
    }
    catch (error) {
        res.status(500).json({ msg: error });
        console.log(error);
    }
}

module.exports = { signupUserController, loginUserController}