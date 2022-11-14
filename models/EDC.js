const mongoose = require('mongoose')

const EDCSchema = new mongoose.Schema({
  modelNumber: {
    type: String,
    required: true,
  },
  pumpCode: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
  },
  configuration: {
    type: String,
    required: true,
  },
  pumpSize: {
    type: Number,
    required: false,
  },
  pilotStyle: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model('EDC', EDCSchema)
