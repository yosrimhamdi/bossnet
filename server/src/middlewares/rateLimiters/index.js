const {
  CONTACT_TOO_MANY_REQUESTS_ERROR_MSG,
  CLIENT_TOO_MANY_REQUESTS_ERROR_MSG,
} = require("../../config/responseErrorsMsgs");
const createRateLimiterMiddleware = require("./utils/createRateLimiterMiddleware");

const createContact = createRateLimiterMiddleware({
  prefix: "createContact",
  maxRequests: 5,
  forDuration: "1day",
  skipFailedRequests: true,
  messageError: CONTACT_TOO_MANY_REQUESTS_ERROR_MSG,
});

const signIn = createRateLimiterMiddleware({
  prefix: "signIn",
  maxRequests: 10,
  forDuration: "30min",
  skipSuccessfulRequests: true,
  messageError: CLIENT_TOO_MANY_REQUESTS_ERROR_MSG,
});

const signUp = createRateLimiterMiddleware({
  prefix: "signUp",
  maxRequests: 10,
  forDuration: "30min",
  skipFailedRequests: true,
  messageError: CLIENT_TOO_MANY_REQUESTS_ERROR_MSG,
});

const resetPasswordRequest = createRateLimiterMiddleware({
  prefix: "passResetReq",
  maxRequests: 10,
  forDuration: "30min",
  messageError: CLIENT_TOO_MANY_REQUESTS_ERROR_MSG,
});

const resetPassword = createRateLimiterMiddleware({
  prefix: "passReset",
  maxRequests: 10,
  forDuration: "30min",
  messageError: CLIENT_TOO_MANY_REQUESTS_ERROR_MSG,
});

const updateData = createRateLimiterMiddleware({
  prefix: "updateData",
  maxRequests: 10,
  forDuration: "30min",
  messageError: CLIENT_TOO_MANY_REQUESTS_ERROR_MSG,
});

const updatePassword = createRateLimiterMiddleware({
  prefix: "updatePass",
  maxRequests: 10,
  forDuration: "30min",
  messageError: CLIENT_TOO_MANY_REQUESTS_ERROR_MSG,
});

module.exports = {
  createContact,
  signIn,
  signUp,
  resetPasswordRequest,
  resetPassword,
  updateData,
  updatePassword,
};
