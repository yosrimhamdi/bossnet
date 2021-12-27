const createJoiValidatorMiddleware = require("./utils/createJoiValidatorMiddleware");
const Joi = require("joi");
const JoiObjectIdValidator = require("joi-objectid")(Joi);

const NOT_SPACE_OR_ALPHANUM_REGEX = /[^\w\s\zàâçéèêëîïôûùüÿñæœ]/gi;

const getPartnersByCategory = createJoiValidatorMiddleware(
  Joi.object({
    categoryId: JoiObjectIdValidator(),
    page: Joi.number().min(1),
  }),
  "params"
);

const getPartnersBySearchQuery = [
  createJoiValidatorMiddleware(
    Joi.object({
      page: Joi.number().min(1),
    }),
    "params"
  ),
  createJoiValidatorMiddleware(
    Joi.object({
      searchQuery: Joi.string().trim().replace(NOT_SPACE_OR_ALPHANUM_REGEX, ""),
    }),
    "query"
  ),
];

const getPartnersSuggestionsBySearchQuery = createJoiValidatorMiddleware(
  Joi.object({
    searchQuery: Joi.string()
      .trim()
      .replace(NOT_SPACE_OR_ALPHANUM_REGEX, "")
      .required(),
  }),
  "params"
);

const getPartnerById = createJoiValidatorMiddleware(
  Joi.object({
    partnerId: JoiObjectIdValidator(),
  }),
  "params"
);

module.exports = {
  getPartnersByCategory,
  getPartnersBySearchQuery,
  getPartnersSuggestionsBySearchQuery,
  getPartnerById,
};
