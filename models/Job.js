const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const JobSchema = new mongoose.Schema({
    inDate: {
        type: Date,
        required: true,
    },
    jobNumber: Number,
    customer: {
        type: Number,//id from customer db 
        required: true,
    },
    poNumber: Number,
    referenceNum: Number,
    quantity: {
        type: Number,
        required: true,
    },
    units: {
        type: Array,//ids from unit db. MFG, Model, S/N
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    shipped: Date,
    invoiced: Boolean,
    comments: String,
})
JobSchema.plugin(AutoIncrement, {inc_field: 'jobNumber', start_seq: 10001});

module.exports = mongoose.model('Job', JobSchema)