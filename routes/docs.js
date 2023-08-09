const express = require("express");
const router = express.Router();
const documentsController = require("../controllers/documents");
const { ensureAuth } = require("../middleware/auth");
const upload = require("../middleware/multer");

router.get("/", ensureAuth, documentsController.getDocuments);

router.get("/:documentId", ensureAuth, documentsController.getSingleDocument);

router.post(
  "/addDocument",
  ensureAuth,
  upload.any(),
  documentsController.addDocument
);

// router.post('/createPriceListItem/:listId', ensureAuth, documentsController.createPriceListItem)

// router.put('/favoritePriceList/:listId', ensureAuth, documentsController.favoritePriceList)

// router.put('/editPriceListItem/:listId/:itemId', ensureAuth, documentsController.editPriceListItem)

router.delete(
  "/deleteDocument/:documentId",
  ensureAuth,
  documentsController.deleteDocument
);

// router.delete('/deletePriceListItem/:listId/:itemId', ensureAuth, documentsController.deletePriceListItem)

module.exports = router;
