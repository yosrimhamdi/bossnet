const createJoiValidatorMiddleware = require("./utils/createJoiValidatorMiddleware");
const Joi = require("joi");
const JoiObjectIdValidator = require("joi-objectid")(Joi);

const getOffersByPartner = createJoiValidatorMiddleware(
  Joi.object({
    partnerId: JoiObjectIdValidator(),
    page: Joi.number().min(1),
  }),
  "params"
);

const getPartnerOfferById = createJoiValidatorMiddleware(
  Joi.object({
    offerId: JoiObjectIdValidator(),
  }),
  "params"
);

module.exports = {
  getOffersByPartner,
  getPartnerOfferById,
};
