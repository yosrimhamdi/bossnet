const clientService = require("./../services/clientService");
const validateGoogleRecaptchaToken = require("./utils/validateGoogleRecaptchaToken");
const {
  PARENT_HAS_FULL_CHILDREN_ERROR_MSG,
  UNEXPECTED_ERROR_MSG,
  EMAIL_ALREADY_EXISTS_ERROR_MSG,
  PARENT_NOT_FOUND_ERROR_MSG,
  CAPTCHA_ERROR_MSG,
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

module.exports = {
  signUp,
};
