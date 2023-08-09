const mongoose = require("mongoose");
const GridFileSchema = require("gridfile");

module.exports = mongoose.model("GridFile", GridFileSchema);
