const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASSWORD } = require("../config");

module.exports = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});
