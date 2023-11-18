const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productCategory: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'CategoryModel',
        required : true
    },
    productImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productQuantity: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Number,
        required: true,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

var ProductModel = mongoose.model('products',productSchema)
module.exports = ProductModel