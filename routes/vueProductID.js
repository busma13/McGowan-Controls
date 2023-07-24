const express = require("express");
const router = express.Router();
const vueProductIDController = require("../controllers/vueProductID");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, vueProductIDController.getProductIDPage);

router.get("/pilot", ensureAuth, vueProductIDController.getProductIDPilot);

module.exports = router;
