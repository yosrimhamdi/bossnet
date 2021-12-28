const Contact = require("../models/Contact");

const createContact = async ({
  firstName,
  lastName,
  email,
  companyName,
  mobilePhone,
  message,
}) => {
  const newContact = await Contact.create({
    firstName,
    lastName,
    email,
    companyName,
    mobilePhone,
    message,
  });
  return newContact;
};

module.exports = {
  createContact,
};
