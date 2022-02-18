const { NOT_FOUND_MSG } = require("../config/responseErrorsMsgs");
const HttpError = require("../utils/HttpError");

class NotFoundError extends HttpError {
  constructor() {
    super(404, NOT_FOUND_MSG);
  }
}

module.exports = {
  NotFoundError,
};
