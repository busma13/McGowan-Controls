const express = require('express')
const router = express.Router()
const priceListsController = require('../controllers/priceLists') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, priceListsController.getPriceLists)

router.post('/createPriceList', priceListsController.createPriceList)

router.delete('/deletePriceList', priceListsController.deletePriceList)

module.exports = router