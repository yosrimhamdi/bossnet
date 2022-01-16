const clientService = require("./../services/clientService");
const validateGoogleRecaptchaToken = require("./utils/validateGoogleRecaptchaToken");
const {
  PARENT_HAS_FULL_CHILDREN_ERROR_MSG,
  UNEXPECTED_ERROR_MSG,
  EMAIL_ALREADY_EXISTS_ERROR_MSG,
  PARENT_NOT_FOUND_ERROR_MSG,
  CAPTCHA_ERROR_MSG,
  CLIENT_DOES_NOT_EXISTS_ERROR_MSG,
  CLIENT_PASSWORD_AND_EMAIL_DOES_NOT_MATCH_ERROR_MSG,
  CLIENT_SEND_RESET_PASSWORD_EMAIL_ERROR_MSG,
  CLIENT_PASSWORD_RESET_DOES_NOT_EXISTS_ERROR_MSG,
  CLIENT_PASSWORD_RESET_EXPIRED_ERROR_MSG,
  GET_CLIENT_TREE_NOT_ALLOWED_ERROR_MSG,
  CLIENT_UPDATE_NOT_ALLOWED_ERROR_MSG,
} = require("../config/responseErrorsMsgs");

/*
    body: {
      firstName,
      lastName,
      gender,
      mobilePhone,
      facebookAccountLink,
      cinId,
      rib,
      email,
      password,
      parentId,
      recaptchaToken
    }
*/
const signUp = async (req, res) => {
  const { recaptchaToken } = req.body;
  try {
    if (await validateGoogleRecaptchaToken(recaptchaToken, "signup")) {
      try {
        const client = await clientService.signUp(req.body);
        res.status(201).send({
          clientId: client._id,
        });
      } catch (err) {
        if (
          err instanceof clientService.exceptions.ParentHasFullChildrenError
        ) {
          res.status(400).send({
            error: PARENT_HAS_FULL_CHILDREN_ERROR_MSG,
          });
        } else if (
          err instanceof clientService.exceptions.ParentDoesNotExistsError
        ) {
          res.status(400).send({
            error: PARENT_NOT_FOUND_ERROR_MSG,
          });
        } else if (
          err instanceof clientService.exceptions.EmailAlreadyExistsError
        ) {
          res.status(400).send({
            error: EMAIL_ALREADY_EXISTS_ERROR_MSG,
          });
        } else {
          res.status(500).send({
            error: UNEXPECTED_ERROR_MSG,
          });
        }
      }
      return;
    }
    res.status(400).send({
      error: CAPTCHA_ERROR_MSG,
    });
  } catch (err) {
    // captcha unexpected error
    res.status(500).send({
      error: UNEXPECTED_ERROR_MSG,
    });
  }
};

/*
  body: {
    email,
    password
  }
*/
const signIn = async (req, res) => {
  try {
    const response = await clientService.signIn(req.body);
    res.send(response);
  } catch (err) {
    if (err instanceof clientService.exceptions.ClientDoesNotExistsError) {
      res.status(401).send({
        error: CLIENT_DOES_NOT_EXISTS_ERROR_MSG,
      });
    } else if (
      err instanceof
      clientService.exceptions.ClientPasswordAndEmailDoesNotMatchError
    ) {
      res.status(401).send({
        error: CLIENT_PASSWORD_AND_EMAIL_DOES_NOT_MATCH_ERROR_MSG,
      });
    } else {
      console.log(err);
      res.status(500).send({
        error: UNEXPECTED_ERROR_MSG,
      });
    }
  }
};

/*
  body: {email, recaptchaToken}
*/
const resetPasswordRequest = async (req, res) => {
  const { recaptchaToken } = req.body;
  try {
    if (
      await validateGoogleRecaptchaToken(recaptchaToken, "resetPasswordRequest")
    ) {
      try {
        await clientService.resetPasswordRequest(req.body.email);
        res.status(204).send();
      } catch (err) {
        if (err instanceof clientService.exceptions.ClientDoesNotExistsError) {
          res.status(400).send({
            error: CLIENT_DOES_NOT_EXISTS_ERROR_MSG,
          });
        } else if (
          err instanceof
          clientService.exceptions.ClientSendResetPasswordEmailError
        ) {
          res.status(500).send({
            error: CLIENT_SEND_RESET_PASSWORD_EMAIL_ERROR_MSG,
          });
        } else {
          console.log(err);
          res.status(500).send({
            error: UNEXPECTED_ERROR_MSG,
          });
        }
      }
      return;
    }
    res.status(400).send({
      error: CAPTCHA_ERROR_MSG,
    });
  } catch (err) {
    // captcha unexpected error
    res.status(500).send({
      error: UNEXPECTED_ERROR_MSG,
    });
  }
};

/*
  body: {
    clientId,
    resetKey,
    password
  }
*/
const resetPassword = async (req, res) => {
  try {
    await clientService.resetPassword(req.body);
    res.status(204).send();
  } catch (err) {
    if (
      err instanceof
      clientService.exceptions.ClientPasswordResetDoesNotExistsError
    ) {
      res.status(400).send({
        error: CLIENT_PASSWORD_RESET_DOES_NOT_EXISTS_ERROR_MSG,
      });
    } else if (
      err instanceof clientService.exceptions.ClientPasswordResetExpiredError
    ) {
      res.status(400).send({
        error: CLIENT_PASSWORD_RESET_EXPIRED_ERROR_MSG,
      });
    } else {
      console.log(err);
      res.status(500).send({
        error: UNEXPECTED_ERROR_MSG,
      });
    }
  }
};

/*
  body: {
    password,
    firstName,
    lastName,
    gender,
    mobilePhone,
    facebookAccountLink,
    cinId,
    rib
  }
*/
const updateData = async (req, res) => {
  try {
    await clientService.updateData(req.client._id, req.body);
    res.status(204).send();
  } catch (err) {
    if (err instanceof clientService.exceptions.ClientUpdateNotAllowedError) {
      res.status(401).send({
        error: CLIENT_UPDATE_NOT_ALLOWED_ERROR_MSG,
      });
    } else {
      res.status(500).send({
        error: UNEXPECTED_ERROR_MSG,
      });
    }
  }
};

/*
  body: {
    currentPassword,
    newPassword
  }
*/
const updatePassword = async (req, res) => {
  try {
    await clientService.updatePassword(req.client._id, req.body);
    res.status(204).send();
  } catch (err) {
    if (err instanceof clientService.exceptions.ClientUpdateNotAllowedError) {
      res.status(401).send({
        error: CLIENT_UPDATE_NOT_ALLOWED_ERROR_MSG,
      });
    } else {
      console.log(err);
      res.status(500).send({
        error: UNEXPECTED_ERROR_MSG,
      });
    }
  }
};

/*
  params: {clientId}
*/
const getTreeByClientId = async (req, res) => {
  try {
    const clients = await clientService.getTreeByClientId(
      req.params.clientId,
      req.client._id
    );
    res.send({
      clients,
    });
  } catch (err) {
    if (err instanceof clientService.exceptions.GetClientTreeNotAllowedError) {
      res.status(403).send({
        error: GET_CLIENT_TREE_NOT_ALLOWED_ERROR_MSG,
      });
    } else {
      res.status(500).send({
        error: UNEXPECTED_ERROR_MSG,
      });
    }
  }
};

/*
  params: {page}
*/
const getAuthClientChildren = async (req, res) => {
  const clients = await clientService.getClientChildren(
    req.client._id,
    req.params.page
  );
  res.send({
    clients,
  });
};

const getAuthClientBalance = async (req, res) => {
  const balance = await clientService.getClientBalance(req.client._id);
  res.send({ balance });
};

/*
  params: {page}
*/
const getAuthClientPaymentsHistory = async (req, res) => {
  const payments = await clientService.getClientPaymentsHistory(
    req.client._id,
    req.params.page
  );
  res.send({
    payments,
  });
};

module.exports = {
  signUp,
  signIn,
  resetPasswordRequest,
  resetPassword,
  getTreeByClientId,
  getAuthClientChildren,
  updateData,
  updatePassword,
  getAuthClientBalance,
  getAuthClientPaymentsHistory,
};
