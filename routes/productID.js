const express = require('express')
const router = express.Router()
const productIDController = require('../controllers/productID') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, productIDController.getProductID)

// router.get('/:listId', ensureAuth, priceListsController.getSinglePriceList)

module.exports = router