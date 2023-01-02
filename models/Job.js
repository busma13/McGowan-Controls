const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const JobSchema = new mongoose.Schema({
    inDate: {
        type: Date,
        required: true,
    },
    jobNumber: Number,
    customer: {
        type: String, 
        required: true,
    },
    poNumber: String,
    refNumber: String,
    units: {
        type: Array,
        required: true,
    },
    shipped: Date,
    invoiced: Boolean,
    comments: String,
})
JobSchema.plugin(AutoIncrement, {inc_field: 'jobNumber', start_seq: 10001});

module.exports = mongoose.model('Job', JobSchema)