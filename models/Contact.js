const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    title: {
        type: String,
    },
    tel: {
        type: Number,
    },
    comments: String,
})

module.exports = mongoose.model('Contact', ContactSchema)