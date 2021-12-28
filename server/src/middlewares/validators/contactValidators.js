const createJoiValidatorMiddleware = require("./utils/createJoiValidatorMiddleware");
const Joi = require("joi");

const VALID_PHONE_NUMBER_REGEX = /^[0-9]{8,8}$/;

const createContact = createJoiValidatorMiddleware(
  Joi.object({
    firstName: Joi.string().trim().min(2).max(50).required(),
    lastName: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    companyName: Joi.string().trim().min(2).max(50).allow(""),
    mobilePhone: Joi.string()
      .replace(" ", "")
      .replace("+216", "")
      .regex(VALID_PHONE_NUMBER_REGEX)
      .allow(""),
    message: Joi.string().trim().min(10).max(300).required(),
    recaptchaToken: Joi.string().required(),
  })
);

module.exports = {
  createContact,
};
