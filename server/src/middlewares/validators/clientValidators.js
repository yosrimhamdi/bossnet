const createJoiValidatorMiddleware = require("./utils/createJoiValidatorMiddleware");
const Joi = require("joi");
const { CLIENT_PROFILE_GENDER_CHOICES } = require("../../models/configs/enums");
const JoiObjectIdValidator = require("joi-objectid")(Joi);

const VALID_PHONE_NUMBER_REGEX = /^[0-9]{8,8}$/;

const signUp = createJoiValidatorMiddleware(
  Joi.object({
    firstName: Joi.string().trim().min(2).max(50).required(),
    lastName: Joi.string().trim().min(2).max(50).required(),
    mobilePhone: Joi.string()
      .replace(" ", "")
      .replace("+216", "")
      .regex(VALID_PHONE_NUMBER_REGEX)
      .required(),
    facebookAccountLink: Joi.string().uri({ allowRelative: true }).allow(""),
    gender: Joi.string()
      .valid(...CLIENT_PROFILE_GENDER_CHOICES.map(({ value }) => value))
      .required(),

    parentId: JoiObjectIdValidator().required(),

    cinId: Joi.string()
      .length(8)
      .pattern(/^[0-9]+$/)
      .required(),
    rib: Joi.string()
      .replace(" ", "")
      .length(20)
      .pattern(/^[0-9]+$/)
      .allow(""),

    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string()
      .min(8)
      .max(128)
      .regex(/^[\S]+$/)
      .required(),
    recaptchaToken: Joi.string().required(),
  })
);

const signIn = createJoiValidatorMiddleware(
  Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string()
      .min(8)
      .max(128)
      .regex(/^[\S]+$/)
      .required(),
  })
);

const resetPasswordRequest = createJoiValidatorMiddleware(
  Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    recaptchaToken: Joi.string().required(),
  })
);

const resetPassword = createJoiValidatorMiddleware(
  Joi.object({
    clientId: JoiObjectIdValidator().required(),
    password: Joi.string()
      .min(8)
      .max(128)
      .regex(/^[\S]+$/)
      .required(),
    resetKey: Joi.string()
      .regex(/^[a-zA-Z0-9]{30}$/)
      .required(),
  })
);

const getTreeByClientId = createJoiValidatorMiddleware(
  Joi.object({
    clientId: JoiObjectIdValidator().required(),
  }),
  "params"
);

const getAuthClientChildren = createJoiValidatorMiddleware(
  Joi.object({
    page: Joi.number().min(1),
  }),
  "params"
);

const updateData = createJoiValidatorMiddleware(
  Joi.object({
    firstName: Joi.string().trim().min(2).max(50).required(),
    lastName: Joi.string().trim().min(2).max(50).required(),
    mobilePhone: Joi.string()
      .replace(" ", "")
      .replace("+216", "")
      .regex(VALID_PHONE_NUMBER_REGEX)
      .required(),
    facebookAccountLink: Joi.string().uri({ allowRelative: true }).allow(""),
    gender: Joi.string()
      .valid(...CLIENT_PROFILE_GENDER_CHOICES.map(({ value }) => value))
      .required(),
    cinId: Joi.string()
      .length(8)
      .pattern(/^[0-9]+$/)
      .required(),
    rib: Joi.string()
      .replace(" ", "")
      .length(20)
      .pattern(/^[0-9]+$/)
      .allow(""),
    password: Joi.string()
      .min(8)
      .max(128)
      .regex(/^[\S]+$/)
      .required(),
  })
);

const updatePassword = createJoiValidatorMiddleware(
  Joi.object({
    currentPassword: Joi.string()
      .min(8)
      .max(128)
      .regex(/^[\S]+$/)
      .required(),
    newPassword: Joi.string()
      .min(8)
      .max(128)
      .regex(/^[\S]+$/)
      .required(),
  })
);

const getAuthClientPaymentsHistory = createJoiValidatorMiddleware(
  Joi.object({
    page: Joi.number().min(1),
  }),
  "params"
);

module.exports = {
  signUp,
  signIn,
  resetPasswordRequest,
  resetPassword,
  getTreeByClientId,
  getAuthClientChildren,
  updateData,
  updatePassword,
  getAuthClientPaymentsHistory,
};
