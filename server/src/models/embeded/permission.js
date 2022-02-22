const mongoose = require("mongoose");
const collectionNames = require("../configs/collectionsNames");
const COLLECTIONS = Object.values(collectionNames);

module.exports = new mongoose.Schema(
  {
    _collection: {
      type: String,
      enum: COLLECTIONS,
      default: COLLECTIONS[0],
    },
    canView: Boolean,
    canCreate: Boolean,
    canModify: Boolean,
    canDelete: Boolean,
  },
  {
    _id: false,
    versionKey: false,
  }
);
