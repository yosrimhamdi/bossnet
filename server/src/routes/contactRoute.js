const { Router } = require("express");
const contactController = require("./../controllers/contactController");
const contactValidators = require("./../middlewares/validators/contactValidators");

const contactRouter = new Router();

contactRouter.post(
  "/create",
  contactValidators.createContact,
  contactController.createContact
);

module.exports = {
  path: "/contact",
  route: contactRouter,
};
