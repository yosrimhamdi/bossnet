const createJoiValidatorMiddleware = require("./utils/createJoiValidatorMiddleware");
const Joi = require("joi");
const JoiObjectIdValidator = require('joi-objectid')(Joi);

const getPartnersByCategory = createJoiValidatorMiddleware(
    Joi.object({
        categoryId: JoiObjectIdValidator(),
        page: Joi.number().min(1)
    }),
    "params"
);

module.exports = {
    getPartnersByCategory
}