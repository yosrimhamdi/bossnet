class ParentDoesNotExistsError extends Error {
  constructor() {
    super("Parent does not exists");
  }
}

class ParentHasFullChildrenError extends Error {
  constructor() {
    super("Parent has full children");
  }
}

class EmailAlreadyExistsError extends Error {
  constructor() {
    super("A client with this email already exists");
  }
}

class ClientDoesNotExistsError extends Error {
  constructor() {
    super("Client does not exists");
  }
}

class ClientPasswordAndEmailDoesNotMatchError extends Error {
  constructor() {
    super("Client password and email does not match");
  }
}

class ClientSendResetPasswordEmailError extends Error {
  constructor() {
    super("Client send reset password email error");
  }
}

class ClientPasswordResetDoesNotExistsError extends Error {
  constructor() {
    super("Client reset password does not exists error");
  }
}
class ClientPasswordResetExpiredError extends Error {
  constructor() {
    super("Client reset password expired error");
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
};
