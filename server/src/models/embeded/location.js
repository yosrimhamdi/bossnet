const Joi = require("joi");
const mongoose = require("mongoose");
const createJoiMongooseFieldValidate = require("../../utils/createJoiMongooseFieldValidate");
const { REQUIRED_ERROR_MSG, INVALID_ERROR_MSG } = require("../configs/fieldsValidationMessages");

module.exports = new mongoose.Schema({
    addresses: {
        type: [String],
        required: [true, REQUIRED_ERROR_MSG]
    },
    embedMapIframe: {
        type: String,
        validate: createJoiMongooseFieldValidate(
            Joi.string().trim().regex(new RegExp("^<iframe.*</iframe>$")).allow(""),
            INVALID_ERROR_MSG)
    }
}, {
    _id: false,
    versionKey: false
});