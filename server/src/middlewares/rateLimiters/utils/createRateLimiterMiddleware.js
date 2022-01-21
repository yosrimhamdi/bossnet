const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const {
  TOO_MANY_REQUESTS_ERROR_MSG,
} = require("../../../config/responseErrorsMsgs");
const convertDurationToSeconds = require("../../../utils/convertDurationToSeconds");

module.exports = ({
  maxRequests,
  forDuration,
  messageError = TOO_MANY_REQUESTS_ERROR_MSG,
  skipFailedRequests = false,
  skipSuccessfulRequests = false,
  prefix = "rl",
}) =>
  rateLimit({
    store: new RedisStore({
      expiry: convertDurationToSeconds(forDuration),
      prefix,
    }),
    max: maxRequests,
    message: { error: messageError },
    skipFailedRequests,
    skipSuccessfulRequests,
  });
