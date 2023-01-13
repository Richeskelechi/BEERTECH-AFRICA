const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    customerId: {
        type: String,
        trim: true,
        required: [true, 'You Must Provide a Customer Id']
    },
    itemId: {
        type: String,
        trim: true,
        required: [true, 'You Must Provide An Item Id'],
    },
    price: {
        type: Number,
    },
    orderStatus: {
        type: String,
        trim: true,
        default: 'placed',
    },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;