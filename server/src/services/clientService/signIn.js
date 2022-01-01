const bcrypt = require("bcrypt");
const Client = require("../../models/Client");
const jwtAuth = require("./../../utils/jwtAuth");
const {
  ClientDoesNotExistsError,
  ClientPasswordAndEmailDoesNotMatchError,
} = require("./exceptions");

module.exports = async ({ email, password }) => {
  let client = await Client.findOne({ email, isVerified: true }).select([
    "-__v",
    "-ancestors",
    "-isVerified",
    "-isPaid",
  ]);
  if (!client) throw new ClientDoesNotExistsError();
  console.log(password, client.encryptedPassword);
  if (!(await bcrypt.compare(password, client.encryptedPassword)))
    throw new ClientPasswordAndEmailDoesNotMatchError();
  client = client.toObject();
  delete client.encryptedPassword;
  return {
    authToken: jwtAuth.getClientJwt(client),
    client,
  };
};
