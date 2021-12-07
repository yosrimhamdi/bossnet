const mongoose = require("mongoose");
const collectionNames = require("../configs/collectionsNames");
const COLLECTIONS = Object.values(collectionNames);

module.exports = new mongoose.Schema({
    collection: {
        type: String,
        enum: COLLECTIONS,
        default: COLLECTIONS[0]
    },
    canView: Boolean,
    canCreate: Boolean,
    canModify: Boolean,
    canDelete: Boolean
});