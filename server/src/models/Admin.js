const mongoose = require("mongoose");

const createJoiMongooseFieldValidate = require("../utils/createJoiMongooseFieldValidate");
const { ADMIN_ROLE, ADMIN } = require("./configs/collectionsNames");
const Joi = require("joi");
const { REQUIRED_ERROR_MSG, INVALID_ERROR_MSG, UNIQUE_ERROR_MSG } = require("./configs/fieldsValidationMessages");

const adminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        trim: true
    },
    email: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        unique: true,
        trim: true,
        validate: createJoiMongooseFieldValidate(
            Joi.string().email({ tlds: { allow: false } }),
            INVALID_ERROR_MSG)
    },
    encryptedPassword: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
    },
    isSuperuser: {
        type: Boolean,
        default: false,
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: ADMIN_ROLE
    }
}, { timestamps: true });

const Admin = mongoose.model(ADMIN, adminSchema);
module.exports = Admin;