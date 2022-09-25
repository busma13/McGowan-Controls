const express = require('express')
const router = express.Router()
const priceListsController = require('../controllers/priceLists') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, priceListsController.getPriceLists)

router.get('/:listId', ensureAuth, priceListsController.getSinglePriceList)

router.post('/createPriceList', ensureAuth, priceListsController.createPriceList)

router.post('/createPriceListItem/:listId', ensureAuth, priceListsController.createPriceListItem)

router.delete('/deletePriceList/:listId', ensureAuth, priceListsController.deletePriceList)

router.delete('/deletePriceListItem/:listId/:itemId', ensureAuth, priceListsController.deletePriceListItem)

module.exports = router