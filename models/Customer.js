const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    shippingAddress: {
        type: String,
        required:true,
    },
    billingAddress: {
        type: String,
        required:true,
    },
    contacts: {
        type: Array,
    },
    tel: {
        type: Number,
    },
    fax: {
        type: Number,
    },
    comments: {
        type: String,
    }
})

module.exports = mongoose.model('Customer', CustomerSchema)