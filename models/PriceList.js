const mongoose = require('mongoose')

const PriceListSchema = new mongoose.Schema({
  listName: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('PriceList', PriceListSchema)
