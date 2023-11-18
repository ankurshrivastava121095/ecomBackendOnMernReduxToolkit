const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required : true
    },
    shippingInfo: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        postalCode: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    subTotal: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    deliveryCharge: {
        type: Number,
        required: true,
    },
    grandTotal: {
        type: Number,
        required: true,
    },
    paymentMode: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

var OrderModel = mongoose.model('orders',orderSchema)
module.exports = OrderModel