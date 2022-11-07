const express = require('express')
const router = express.Router()
const productIDController = require('../controllers/productID') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, productIDController.getProductIDPage)

router.get('/pilot', ensureAuth, productIDController.getProductIDPilot)

module.exports = router