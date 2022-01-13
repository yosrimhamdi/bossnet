const { Router } = require("express");
const clientController = require("./../controllers/clientController");
const clientValidators = require("./../middlewares/validators/clientValidators");
const clientRouter = new Router();
const provideAuthMiddleware = require("./../middlewares/provideAuth");
const ensureAuthMiddleware = require("./../middlewares/ensureAuth");

clientRouter
  .post("/signup", clientValidators.signUp, clientController.signUp)
  .post("/signin", clientValidators.signIn, clientController.signIn)
  .post(
    "/reset-password/request",
    clientValidators.resetPasswordRequest,
    clientController.resetPasswordRequest
  )
  .post(
    "/reset-password",
    clientValidators.resetPassword,
    clientController.resetPassword
  )

  .put(
    "/update/data",
    clientValidators.updateData,
    provideAuthMiddleware,
    ensureAuthMiddleware,
    clientController.updateData
  )
  .put(
    "/update/password",
    clientValidators.updatePassword,
    provideAuthMiddleware,
    ensureAuthMiddleware,
    clientController.updatePassword
  )
  .get(
    "/tree/:clientId",
    clientValidators.getTreeByClientId,
    provideAuthMiddleware,
    ensureAuthMiddleware,
    clientController.getTreeByClientId
  )
  .get(
    "/children/:page",
    clientValidators.getAuthClientChildren,
    provideAuthMiddleware,
    ensureAuthMiddleware,
    clientController.getAuthClientChildren
  )
  .get(
    "/balance",
    provideAuthMiddleware,
    ensureAuthMiddleware,
    clientController.getAuthClientBalance
  )
  .get(
    "/payments-history/:page",
    clientValidators.getAuthClientPaymentsHistory,
    provideAuthMiddleware,
    ensureAuthMiddleware,
    clientController.getAuthClientPaymentsHistory
  );

module.exports = {
  path: "/client",
  route: clientRouter,
};
