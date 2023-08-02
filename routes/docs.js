const express = require("express");
const router = express.Router();
const documentsController = require("../controllers/documents");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, documentsController.getDocuments);

// router.get('/:listId', ensureAuth, documentsController.getSinglePriceList)

// router.post('/createPriceList', ensureAuth, documentsController.createPriceList)

// router.post('/createPriceListItem/:listId', ensureAuth, documentsController.createPriceListItem)

// router.put('/favoritePriceList/:listId', ensureAuth, documentsController.favoritePriceList)

// router.put('/editPriceListItem/:listId/:itemId', ensureAuth, documentsController.editPriceListItem)

// router.delete('/deletePriceList/:listId', ensureAuth, documentsController.deletePriceList)

// router.delete('/deletePriceListItem/:listId/:itemId', ensureAuth, documentsController.deletePriceListItem)

module.exports = router;
