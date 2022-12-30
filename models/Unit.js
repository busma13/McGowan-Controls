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
    comments: String,
})

module.exports = mongoose.model('Unit', UnitSchema)