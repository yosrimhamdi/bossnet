const contactService = require("./../services/contactService");
const {
  MONGOOSE_ERROR_MSG,
  UNEXPECTED_ERROR_MSG,
  CAPTHA_ERROR_MSG,
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
        res.status(400).send({
          error: MONGOOSE_ERROR_MSG,
          details: err,
        });
      }
      return;
    }
    res.status(400).send({
      error: CAPTHA_ERROR_MSG,
    });
  } catch (err) {
    // recaptcha unexpected error
    console.log(err);
    res.status(500).send({
      error: UNEXPECTED_ERROR_MSG,
    });
  }
};

module.exports = {
  createContact,
};
