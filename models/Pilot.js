const mongoose = require('mongoose')

const PilotSchema = new mongoose.Schema({
  modelNumber: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
  },
  revisionLetter: {
    type: String,
    required: true,
  },
  typeNumber: {
    type: String,
    required: false,
  },
  coilNumber: {
    type: String,
    required: false,
  },
  connectorNumber: {
    type: String,
    required: true,
  },
  whereUsed: {
    type: String,
    required: false,
  }
})

module.exports = mongoose.model('Pilot', PilotSchema)
