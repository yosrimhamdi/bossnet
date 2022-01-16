const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const {
  TOO_MANY_REQUESTS_ERROR_MSG,
} = require("../../../config/responseErrorsMsgs");

const convertDurationToSeconds = (duration) => {
  const calc = (duration + "")
    .toLowerCase()
    .replaceAll("day", "*24hour")
    .replaceAll("hour", "*60min")
    .replaceAll("min", "*60")
    .replaceAll("sec", "*1");
  return eval(calc);
};

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
