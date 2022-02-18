const contactService = require("./../services/contactService");

/*
    body: {
        firstName,
        lastName,
        email,
        companyName,
        mobilePhone,
        message
    }
*/
const createContact = async (req, res) => {
  const newContact = await contactService.createContact(req.body);
  res.status(201).send(newContact);
};

module.exports = {
  createContact,
};
