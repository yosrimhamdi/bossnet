const axios = require("axios");
const { GOOGLE_RECAPTCHA_SECRET_KEY, AXIOS_TIMEOUT } = require("../config");
const { CAPTCHA_ERROR_MSG } = require("../config/responseErrorsMsgs");
const HttpError = require("../utils/HttpError");

class CaptchaError extends HttpError {
  constructor() {
    super(400, CAPTCHA_ERROR_MSG);
  }
}

const getVerificationURL = (token) =>
  `https://www.google.com/recaptcha/api/siteverify?secret=${GOOGLE_RECAPTCHA_SECRET_KEY}&response=${token}`;

const validateGoogleRecaptchaToken = async (token, action) => {
  const { data } = await axios.post(
    getVerificationURL(token),
    {},
    { timeout: AXIOS_TIMEOUT }
  );
  return data.action == action && data.success;
};

module.exports = (action) => async (req, res, next) => {
  const { recaptchaToken } = req.body;
  if (await validateGoogleRecaptchaToken(recaptchaToken, action)) {
    next();
  } else {
    throw new CaptchaError();
  }
};
