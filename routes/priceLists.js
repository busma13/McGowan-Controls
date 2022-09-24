const express = require('express')
const router = express.Router()
const priceListsController = require('../controllers/priceLists') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, priceListsController.getPriceLists)

router.get('/:id', ensureAuth, priceListsController.getSinglePriceList)

router.post('/createPriceList', ensureAuth, priceListsController.createPriceList)

router.delete('/deletePriceList/:id', ensureAuth, priceListsController.deletePriceList)

module.exports = router