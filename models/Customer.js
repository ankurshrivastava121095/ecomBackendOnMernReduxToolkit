const mongoose = require('mongoose')


const customerSchema = new mongoose.Schema({
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

var CustomerModel = mongoose.model('customers',customerSchema)
module.exports = CustomerModel