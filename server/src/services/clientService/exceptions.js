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

module.exports = {
  ParentDoesNotExistsError,
  ParentHasFullChildrenError,
  EmailAlreadyExistsError,
};
