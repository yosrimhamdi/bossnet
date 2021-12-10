const mongoose = require("mongoose");
const Joi = require("joi");
const { REQUIRED_ERROR_MSG, INVALID_ERROR_MSG } = require("./configs/fieldsValidationMessages");
const { CLIENT_PROFILE_GENDER_CHOICES } = require("../configs/enums");
const createJoiMongooseFieldValidate = require("../../utils/createJoiMongooseFieldValidate");

module.exports = new mongoose.Schema({
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
    gender: {
        type: String,
        enum: CLIENT_PROFILE_GENDER_CHOICES.map((gender) => gender.value),
        required: [true, REQUIRED_ERROR_MSG],
    },
    mobilePhone: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        validate: createJoiMongooseFieldValidate(
            Joi.string().min(8).max(15), INVALID_ERROR_MSG),
        trim: true
    },
    facebookProfileURL: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        trim: true,
        validate: createJoiMongooseFieldValidate(
            Joi.string().uri(),
            INVALID_ERROR_MSG
        )
    },
    cinId: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        trim: true,
        validate: createJoiMongooseFieldValidate(
            Joi.string().length(8).pattern(/^[0-9]+$/), INVALID_ERROR_MSG),
    },
    rib: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        trim: true,
        validate: createJoiMongooseFieldValidate(Joi.string().length(23), INVALID_ERROR_MSG)
    }
}, {
    _id: false,
    versionKey: false 
});