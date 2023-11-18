const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    },
    categoryDescription: {
        type: String,
        required: true,
    },
    categoryImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
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

var CategoryModel = mongoose.model('categories',categorySchema)
module.exports = CategoryModel