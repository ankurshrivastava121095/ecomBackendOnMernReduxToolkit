const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique : true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique : true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'admin'
    },
    dob: {
        type: String,
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

var UserModel = mongoose.model('users',userSchema)
module.exports = UserModel