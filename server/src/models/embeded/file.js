const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    path: String,
    mimeType: String,
})