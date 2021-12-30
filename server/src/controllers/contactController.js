const contactService = require("./../services/contactService");
const {
  UNEXPECTED_ERROR_MSG,
  CAPTCHA_ERROR_MSG,
} = require("./configs/responseErrorsMsgs");
const validateGoogleRecaptchaToken = require("./utils/validateGoogleRecaptchaToken");

/*
    body: {
        firstName,
        lastName,
        email,
        companyName,
        mobilePhone,
        message,
        recaptchaToken
    }
*/
const createContact = async (req, res) => {
  const { recaptchaToken } = req.body;
  try {
    if (await validateGoogleRecaptchaToken(recaptchaToken, "contact")) {
      try {
        const newContact = await contactService.createContact(req.body);
        res.status(201).send(newContact);
      } catch (err) {
        res.status(500).send({
          error: UNEXPECTED_ERROR_MSG,
        });
      }
      return;
    }
    res.status(400).send({
      error: CAPTCHA_ERROR_MSG,
    });
  } catch (err) {
    // recaptcha unexpected error
    res.status(500).send({
      error: UNEXPECTED_ERROR_MSG,
    });
  }
};

module.exports = {
  createContact,
};
