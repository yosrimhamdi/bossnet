const { UNEXPECTED_ERROR_MSG } = require("../config/responseErrorsMsgs");
const consola = require("consola");

module.exports = (err, req, res, next) => {
  consola.error(err);
  res.status(500);
  res.json({ error: UNEXPECTED_ERROR_MSG });
};
