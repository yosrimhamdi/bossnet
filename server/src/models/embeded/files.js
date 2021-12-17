const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    mimeTypes: [String],
    paths: [String],
    buckets: [String]
}, {
    _id: false,
    versionKey: false
})