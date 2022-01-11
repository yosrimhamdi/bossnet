const Client = require("../../models/Client");
const bcrypt = require("bcrypt");

// check if client update is allowed or not
module.exports = async (clientId, password) => {
  const client = await Client.findById(clientId).select("encryptedPassword");
  return await bcrypt.compare(password, client.encryptedPassword);
};
