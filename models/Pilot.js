const mongoose = require('mongoose')

const PilotSchema = new mongoose.Schema({
  manufacturer: {
    type: String,
    required: true,
  },
  modelNumber: {
    type: String,
    required: true,
  },
  revisionLetter: {
    type: String,
    required: true,
  },
  typeNumber: {
    type: Number,
    required: true,
  },
  coilNumber: {
    type: Number,
    required: true,
  },
  connectorNumber: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Pilot', PilotSchema)
