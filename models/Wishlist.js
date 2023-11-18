const mongoose = require('mongoose')


const wishlistSchema = new mongoose.Schema({
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
    productDetail: {
        productName: {
            type: String,
            required: true,
        },
        productPrice: {
            type: Number,
            required: true,
        },
        productImage: {
            type: String,
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

var WishlistModel = mongoose.model('wishlists',wishlistSchema)
module.exports = WishlistModel