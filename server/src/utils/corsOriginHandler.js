const { CLIENT_ENDPOINTS } = require("../config");

const whitelist = CLIENT_ENDPOINTS.split(",");

module.exports = (origin, callback) => {
  if (whitelist.indexOf(origin) !== -1) {
    callback(null, true);
  } else {
    callback(new Error("Not allowed by CORS"));
  }
};
