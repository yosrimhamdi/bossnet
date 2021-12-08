const Joi = require("joi");
const mongoose = require("mongoose");
const createJoiMongooseFieldValidate = require("../utils/createJoiMongooseFieldValidate");
const { CONTACT } = require("./configs/collectionsNames");
const { INVALID_ERROR_MSG, REQUIRED_ERROR_MSG } = require("./configs/fieldsValidationMessages");

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        trim: true
    },
    email: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        trim: true,
        validate: createJoiMongooseFieldValidate(
            Joi.string().email({ tlds: { allow: false } }),
            INVALID_ERROR_MSG)
    },
    companyName: {
        type: String,
        trim: true
    },
    mobilePhone: {
        type: String,
        trim: true
    },
    message: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        trim: true
    },
    isContacted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Contact = mongoose.model(CONTACT, contactSchema);
module.exports = Contact;