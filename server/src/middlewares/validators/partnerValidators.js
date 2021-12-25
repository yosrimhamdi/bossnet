const createJoiValidatorMiddleware = require("./utils/createJoiValidatorMiddleware");
const Joi = require("joi");
const JoiObjectIdValidator = require("joi-objectid")(Joi);

const getPartnersByCategory = createJoiValidatorMiddleware(
  Joi.object({
    categoryId: JoiObjectIdValidator(),
    page: Joi.number().min(1),
  }),
  "params"
);

const getPartnersBySearchQuery = createJoiValidatorMiddleware(
  Joi.object({
    searchQuery: Joi.string().trim().required(),
    page: Joi.number().min(1),
  }),
  "params"
);

const getPartnersSuggestionsBySearchQuery = createJoiValidatorMiddleware(
  Joi.object({
    searchQuery: Joi.string().trim().required(),
  }),
  "params"
);

module.exports = {
  getPartnersByCategory,
  getPartnersBySearchQuery,
  getPartnersSuggestionsBySearchQuery,
};
