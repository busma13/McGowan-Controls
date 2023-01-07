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
    contact: {
        type: String,
    },
    tel: {
        type: String,
    },
    fax: {
        type: String,
    },
    comments: {
        type: String,
    }
})

module.exports = mongoose.model('Customer', CustomerSchema)