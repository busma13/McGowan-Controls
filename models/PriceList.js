const mongoose = require('mongoose')

const PriceListSchema = new mongoose.Schema({
  listName: {
    type: String,
    required: true,
  },
  favorite: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = mongoose.model('PriceList', PriceListSchema)
