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
    statusValue: {
        type: String,
        required: true,
    },
    statusString: {
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
    shipped: Date,
    comments: String,
    jobId: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Unit', UnitSchema)