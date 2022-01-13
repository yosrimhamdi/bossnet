const { UNEXPECTED_ERROR_MSG } = require("../config/responseErrorsMsgs");

module.exports = (err, req, res, next) => {
  res.status(500);
  res.json({ error: UNEXPECTED_ERROR_MSG });
};
