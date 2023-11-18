const mongoose = require('mongoose')


const orderedProductSchema = new mongoose.Schema({
    orderId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'OrderModel',
        required : true
    },
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required : true
    },
    productDetail: {
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
        productQuantity: {
            type: Number,
            required: true,
        },
        productImage: {
            type: String,
            required: true,
        },
    },
    status: {
        type: String,
        required: true,
        default: 'Confirm'
    },
    isShipped: {
        type: Number,
        required: true,
        default: 0
    },
    shipmentDate: {
        type: String,
        default: ''
    },
    isOutForDelivery: {
        type: Number,
        required: true,
        default: 0
    },
    outForDeliveryDate: {
        type: String,
        default: ''
    },
    isDelivered: {
        type: Number,
        required: true,
        default: 0
    },
    deliveryDate: {
        type: String,
        default: ''
    },
    isCancelled: {
        type: Number,
        required: true,
        default: 0
    },
    cancellationDate: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

var OrderedProductModel = mongoose.model('orderedProducts',orderedProductSchema)
module.exports = OrderedProductModel