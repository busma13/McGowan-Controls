const mongoose = require('mongoose')

const UnitSchema = new mongoose.Schema({
    manufacturer: {
        type: String,
        required: true,
    },
    modelNumber: {
        type: String,
        required: true,
    },
    serialNumber: String,
    status: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    saleType: {
        type: String, 
        required: true,
    },
    coreExchange: {
        type: String,
        required: true,
    },
    comments: String,
})

module.exports = mongoose.model('Unit', UnitSchema)