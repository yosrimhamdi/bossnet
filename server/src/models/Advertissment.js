const mongoose = require("mongoose");
const { ADVERTISSMENT } = require("./configs/collectionsNames");
const duration = require("./embeded/duration");
const file = require("./embeded/file");
const { AD_POSITION_CHOICES } = require("./configs/enums");
const { REQUIRED_ERROR_MSG, INVALID_ERROR_MSG } = require("./configs/fieldsValidationMessages");
const createJoiMongooseFieldValidate = require("../utils/createJoiMongooseFieldValidate");
const Joi = require("joi");


const advertissmentSchema = new mongoose.Schema({
    image: file,
    title: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        trim: true
    },
    position: {
        type: String,
        enum: AD_POSITION_CHOICES.map((pos) => pos.value),
        required: [true, REQUIRED_ERROR_MSG]
    },
    duration: {
        type: duration,
        required: [true, REQUIRED_ERROR_MSG]
    },
    url: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        trim: true,
        validate: createJoiMongooseFieldValidate(
            Joi.string().uri({ allowRelative: true }),
            INVALID_ERROR_MSG
        )
    },
    showAtHome: Boolean
}, { timestamps: true });

const Advertissment = mongoose.model(ADVERTISSMENT, advertissmentSchema);
module.exports = Advertissment;