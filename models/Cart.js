const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required : true
    },
    productId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'ProductModel',
        required : true
    },
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

var CartModel = mongoose.model('carts',cartSchema)
module.exports = CartModel