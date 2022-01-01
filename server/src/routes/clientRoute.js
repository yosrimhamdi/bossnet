const { Router } = require("express");
const clientController = require("./../controllers/clientController");
const clientValidators = require("./../middlewares/validators/clientValidators");
const clientRouter = new Router();
const provideAuthMiddleware = require("./../middlewares/provideAuth");
const ensureAuthMiddleware = require("./../middlewares/ensureAuth");

clientRouter
  .post("/signup", clientValidators.signUp, clientController.signUp)
  .post("/signin", clientValidators.signIn, clientController.signIn)
  .get(
    "/data",
    provideAuthMiddleware,
    ensureAuthMiddleware,
    clientController.getAuthClientData
  )
  .post(
    "/reset-password/request",
    clientValidators.resetPasswordRequest,
    clientController.resetPasswordRequest
  )
  .post(
    "/reset-password",
    clientValidators.resetPassword,
    clientController.resetPassword
  );

module.exports = {
  path: "/client",
  route: clientRouter,
};
