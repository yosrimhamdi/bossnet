const { Router } = require("express");
const contactController = require("./../controllers/contactController");
const contactValidators = require("./../middlewares/validators/contactValidators");
const rateLimiters = require("./../middlewares/rateLimiters");
const createGoogleRecaptchaValidatorMiddleware = require("../middlewares/createGoogleRecaptchaValidatorMiddleware");

const contactRouter = new Router();

contactRouter.post(
  "/create",
  rateLimiters.createContact,
  contactValidators.createContact,
  createGoogleRecaptchaValidatorMiddleware("contact"),
  contactController.createContact
);

module.exports = {
  path: "/contact",
  route: contactRouter,
};
