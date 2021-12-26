const mongoose = require("mongoose");

module.exports = new mongoose.Schema(
  {
    mimeType: String,
    path: String,
    bucket: String,
  },
  {
    _id: false,
    versionKey: false,
  }
);
