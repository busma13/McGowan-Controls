const express = require('express')
const router = express.Router()
const portalController = require('../controllers/portal') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, portalController.getPortal)

module.exports = router