const { Router } = require("express");
const clientController = require("./../controllers/clientController");
const clientValidators = require("./../middlewares/validators/clientValidators");
const clientRouter = new Router();

clientRouter.post("/signup", clientValidators.signUp, clientController.signUp);

module.exports = {
  path: "/client",
  route: clientRouter,
};
