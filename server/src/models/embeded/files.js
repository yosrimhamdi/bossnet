const mongoose = require("mongoose");

module.exports = new mongoose.Schema(
  {
    mimeTypes: [String],
    paths: [String],
    buckets: [String],
    sizes: [Number],
  },
  {
    _id: false,
    versionKey: false,
  }
);
