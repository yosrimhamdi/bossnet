const { UNEXPECTED_ERROR_MSG } = require("../config/responseErrorsMsgs");
const consola = require("consola");
const HttpError = require("../utils/HttpError");

module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err) {
    if (err instanceof HttpError) {
      if (err.statusCode >= 500) {
        consola.error(err);
      }
      res.status(err.statusCode);
      res.send({ error: err.message });
    } else {
      consola.error(err);
      res.status(500);
      res.send({ error: UNEXPECTED_ERROR_MSG });
    }
  }
};
