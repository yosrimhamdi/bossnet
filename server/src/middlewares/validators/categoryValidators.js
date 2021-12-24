const createJoiValidatorMiddleware = require("./utils/createJoiValidatorMiddleware");
const Joi = require("joi");
const JoiObjectIdValidator = require('joi-objectid')(Joi);

const getCategoryById = createJoiValidatorMiddleware(
    Joi.object({
        categoryId: JoiObjectIdValidator()
    }),
    "params"
)

module.exports = {
    getCategoryById
}