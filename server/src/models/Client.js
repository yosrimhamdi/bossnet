const mongoose = require("mongoose");
const createJoiMongooseFieldValidate = require("../utils/createJoiMongooseFieldValidate");
const Joi = require("joi");
const { REQUIRED_ERROR_MSG, INVALID_ERROR_MSG, UNIQUE_ERROR_MSG } = require("./configs/fieldsValidationMessages");
const profile = require("./embeded/profile");
const { CLIENT } = require("./configs/collectionsNames");


const clientSchema = new mongoose.Schema({
    profile: {
        type: profile,
        required: [true, REQUIRED_ERROR_MSG]
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
    isVerified: {
        type: Boolean,
        default: false
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    // Binary Tree Structures with an Array of Ancestors
    parent: {
        type: mongoose.Types.ObjectId,
        ref: CLIENT,
        index: true
    },
    ancestors: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: CLIENT
        }],
        index: true
    },
    direction: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        enum: CLIENT_CHILD_DIRECTION_CHOICES.map((direction) => direction.value),
    }
}, { timestamps: true });

const Client = mongoose.model(CLIENT, clientSchema);
module.exports = Client;