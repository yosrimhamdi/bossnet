const axios = require("axios");
const { GOOGLE_RECAPTCHA_SECRET_KEY, AXIOS_TIMEOUT } = require("../../config");

const getVerificationURL = (token) =>
  `https://www.google.com/recaptcha/api/siteverify?secret=${GOOGLE_RECAPTCHA_SECRET_KEY}&response=${token}`;

module.exports = async (token, action) => {
  const { data } = await axios.post(
    getVerificationURL(token),
    {},
    { timeout: AXIOS_TIMEOUT }
  );
  return data.action == action && data.success;
};
