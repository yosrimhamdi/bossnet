const mongoose = require("mongoose");
const { REQUIRED_ERROR_MSG } = require("../configs/fieldsValidationMessages");

module.exports = new mongoose.Schema({
    addresses: {
        type: [String],
        required: [true, REQUIRED_ERROR_MSG]
    },
    embedMapIframe: {
        type: String
    }
}, {
    _id: false,
    versionKey: false
});