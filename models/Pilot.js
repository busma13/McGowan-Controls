const mongoose = require('mongoose')

const PilotSchema = new mongoose.Schema({
  modelNumber: {
    type: String,
    required: true,
  },
  prefix: {
    type: Number,
    required: true,
  },
  configurationLetter: {
    type: String,
    required: true,
  },
  typeNumber: {
    type: Number,
    required: false,
  },
  coilNumber: {
    type: Number,
    required: false,
  },
  connectorNumber: {
    type: Number,
    required: true,
  },
  whereUsed: {
    type: String,
    required: false,
  }
})

module.exports = mongoose.model('Pilot', PilotSchema)
