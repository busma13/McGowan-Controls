const multer = require("multer");
const path = require("path");
const os = require("os");

const tempDir = os.tmpdir();

module.exports = multer({ dest: path.join(tempDir, ".") });
