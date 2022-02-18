const { Router } = require("express");
const clientController = require("./../controllers/clientController");
const clientValidators = require("./../middlewares/validators/clientValidators");
const clientRouter = new Router();
const provideAuthMiddleware = require("./../middlewares/provideAuth");
const ensureAuthMiddleware = require("./../middlewares/ensureAuth");
const rateLimiters = require("./../middlewares/rateLimiters");
const createGoogleRecaptchaValidatorMiddleware = require("../middlewares/createGoogleRecaptchaValidatorMiddleware");

clientRouter
  .post(
    "/signup",
    rateLimiters.signUp,
    clientValidators.signUp,
    createGoogleRecaptchaValidatorMiddleware("signup"),
    clientController.signUp
  )
  .post(
    "/signin",
    rateLimiters.signIn,
    clientValidators.signIn,
    clientController.signIn
  )
  .post(
    "/reset-password/request",
    rateLimiters.resetPasswordRequest,
    clientValidators.resetPasswordRequest,
    createGoogleRecaptchaValidatorMiddleware("resetPasswordRequest"),
    clientController.resetPasswordRequest
  )
  .post(
    "/reset-password",
    rateLimiters.resetPassword,
    clientValidators.resetPassword,
    clientController.resetPassword
  )

  .put(
    "/update/data",
    rateLimiters.updateData,
    clientValidators.updateData,
    provideAuthMiddleware,
    ensureAuthMiddleware,
    clientController.updateData
  )
  .put(
    "/update/password",
    rateLimiters.updatePassword,
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
