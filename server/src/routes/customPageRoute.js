const { Router } = require("express");
const customPageValidators = require("./../middlewares/validators/customPageValidators");
const customPageController = require("../controllers/customPageController");

const customPageRouter = new Router();

customPageRouter.get(
  "/:customPageId",
  customPageValidators.getCustomPageById,
  customPageController.getCustomPageById
);

module.exports = {
  path: "/custom-pages",
  route: customPageRouter,
};
