const nodemailer = require("nodemailer");
const { EMAIL_USER, EMAIL_PASSWORD } = require("../config");

module.exports = nodemailer.createTransport({
  host: "pro1.mail.ovh.net",
  port: 587,
  requireTLS: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});
