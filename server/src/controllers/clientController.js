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
} = require("./configs/responseErrorsMsgs");

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

const getAuthClientData = async (req, res) => {
  res.send({
    client: req.client,
  });
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

module.exports = {
  signUp,
  signIn,
  getAuthClientData,
  resetPasswordRequest,
  resetPassword,
};
