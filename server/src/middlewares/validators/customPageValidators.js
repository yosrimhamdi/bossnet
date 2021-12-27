const createJoiValidatorMiddleware = require("./utils/createJoiValidatorMiddleware");
const Joi = require("joi");
const JoiObjectIdValidator = require("joi-objectid")(Joi);

const getCustomPageById = createJoiValidatorMiddleware(
  Joi.object({
    customPageId: JoiObjectIdValidator(),
  }),
  "params"
);

module.exports = {
  getCustomPageById,
};
