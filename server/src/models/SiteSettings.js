const Joi = require("joi");
const mongoose = require("mongoose");
const createJoiMongooseFieldValidate = require("../utils/createJoiMongooseFieldValidate");
const { SITE_SETTINGS } = require("./configs/collectionsNames");
const {
  INVALID_ERROR_MSG,
  REQUIRED_ERROR_MSG,
} = require("./configs/fieldsValidationMessages");
// this is a one record model only used for setting
// some global website configs
const siteSettingsSchema = new mongoose.Schema({
  phoneNumbers: {
    type: [
      {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        trim: true,
      },
    ],
    required: [true, REQUIRED_ERROR_MSG],
  },
  locations: {
    type: [
      {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        trim: true,
      },
    ],
    required: [true, REQUIRED_ERROR_MSG],
  },
  email: {
    type: String,
    required: [true, REQUIRED_ERROR_MSG],
    trim: true,
    validate: createJoiMongooseFieldValidate(
      Joi.string().email({ tlds: { allow: false } }),
      INVALID_ERROR_MSG
    ),
  },
  timing: {
    type: String,
    trim: true,
  },
  facebookLink: {
    type: String,
    trim: true,
    validate: createJoiMongooseFieldValidate(
      Joi.string()
        .uri({ allowRelative: false })
        .allow(""),
      INVALID_ERROR_MSG
    ),
  },
  youtubeLink: {
    type: String,
    trim: true,
    validate: createJoiMongooseFieldValidate(
      Joi.string()
        .uri({ allowRelative: false })
        .allow(""),
      INVALID_ERROR_MSG
    ),
  },
  whatsAppLink: {
    type: String,
    trim: true,
    validate: createJoiMongooseFieldValidate(
      Joi.string()
        .uri({ allowRelative: false })
        .allow(""),
      INVALID_ERROR_MSG
    ),
  },
});

const SiteSettings = mongoose.model(SITE_SETTINGS, siteSettingsSchema);
module.exports = SiteSettings;
