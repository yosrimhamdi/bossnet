const { Router } = require("express");
const contactController = require("./../controllers/contactController");
const contactValidators = require("./../middlewares/validators/contactValidators");
const rateLimiters = require("./../middlewares/rateLimiters");

const contactRouter = new Router();

contactRouter.post(
  "/create",
  rateLimiters.createContact,
  contactValidators.createContact,
  contactController.createContact
);

module.exports = {
  path: "/contact",
  route: contactRouter,
};
