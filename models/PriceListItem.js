const mongoose = require('mongoose')

const PriceListItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  itemPrice: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  priceListId: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('PriceListItem', PriceListItemSchema)
