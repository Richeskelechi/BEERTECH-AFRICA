const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customerSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
        required: [true, 'You Must Provide A Full Name']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'You Must Provide An Email Address'],
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            }
        }
    },
    phoneNumber: {
        type: String,
        min: [11, 'Must be at least 11 characters, but got {VALUE} characters'],
        max: 15
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'You Must Provide A Password'],
        minlength: [8, 'Password Must Be At Least 8 Characters'],
    },
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;