const {
  PARENT_NOT_FOUND_ERROR_MSG,
  PARENT_HAS_FULL_CHILDREN_ERROR_MSG,
  EMAIL_ALREADY_EXISTS_ERROR_MSG,
  CLIENT_DOES_NOT_EXISTS_ERROR_MSG,
  CLIENT_PASSWORD_AND_EMAIL_DOES_NOT_MATCH_ERROR_MSG,
  CLIENT_SEND_RESET_PASSWORD_EMAIL_ERROR_MSG,
  CLIENT_PASSWORD_RESET_DOES_NOT_EXISTS_ERROR_MSG,
  CLIENT_PASSWORD_RESET_EXPIRED_ERROR_MSG,
  CLIENT_UPDATE_NOT_ALLOWED_ERROR_MSG,
  GET_CLIENT_TREE_NOT_ALLOWED_ERROR_MSG,
} = require("../../config/responseErrorsMsgs");
const HttpError = require("../../utils/HttpError");

class ParentDoesNotExistsError extends HttpError {
  constructor(statusCode = 400) {
    super(statusCode, PARENT_NOT_FOUND_ERROR_MSG);
  }
}

class ParentHasFullChildrenError extends HttpError {
  constructor(statusCode = 400) {
    super(statusCode, PARENT_HAS_FULL_CHILDREN_ERROR_MSG);
  }
}

class EmailAlreadyExistsError extends HttpError {
  constructor(statusCode = 400) {
    super(statusCode, EMAIL_ALREADY_EXISTS_ERROR_MSG);
  }
}

class ClientDoesNotExistsError extends HttpError {
  constructor(statusCode = 400) {
    super(statusCode, CLIENT_DOES_NOT_EXISTS_ERROR_MSG);
  }
}

class ClientPasswordAndEmailDoesNotMatchError extends HttpError {
  constructor(statusCode = 401) {
    super(statusCode, CLIENT_PASSWORD_AND_EMAIL_DOES_NOT_MATCH_ERROR_MSG);
  }
}

class ClientSendResetPasswordEmailError extends HttpError {
  constructor(statusCode = 500) {
    super(statusCode, CLIENT_SEND_RESET_PASSWORD_EMAIL_ERROR_MSG);
  }
}

class ClientPasswordResetDoesNotExistsError extends HttpError {
  constructor(statusCode = 400) {
    super(statusCode, CLIENT_PASSWORD_RESET_DOES_NOT_EXISTS_ERROR_MSG);
  }
}
class ClientPasswordResetExpiredError extends HttpError {
  constructor(statusCode = 400) {
    super(statusCode, CLIENT_PASSWORD_RESET_EXPIRED_ERROR_MSG);
  }
}

class GetClientTreeNotAllowedError extends HttpError {
  constructor(statusCode = 403) {
    super(statusCode, GET_CLIENT_TREE_NOT_ALLOWED_ERROR_MSG);
  }
}

class ClientUpdateNotAllowedError extends HttpError {
  constructor(statusCode = 403) {
    super(statusCode, CLIENT_UPDATE_NOT_ALLOWED_ERROR_MSG);
  }
}

module.exports = {
  ParentDoesNotExistsError,
  ParentHasFullChildrenError,
  EmailAlreadyExistsError,
  ClientDoesNotExistsError,
  ClientPasswordAndEmailDoesNotMatchError,
  ClientSendResetPasswordEmailError,
  ClientPasswordResetDoesNotExistsError,
  ClientPasswordResetExpiredError,
  GetClientTreeNotAllowedError,
  ClientUpdateNotAllowedError,
};
