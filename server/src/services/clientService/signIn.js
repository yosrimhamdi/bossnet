const bcrypt = require("bcrypt");
const Client = require("../../models/Client");
const jwtAuth = require("./../../utils/jwtAuth");
const {
  ClientDoesNotExistsError,
  ClientPasswordAndEmailDoesNotMatchError,
} = require("./exceptions");

module.exports = async ({ email, password }) => {
  const client = await Client.findOne({ email, isVerified: true }).select([
    "_id",
    "encryptedPassword",
  ]);
  if (!client) throw new ClientDoesNotExistsError();
  console.log(password, client.encryptedPassword);
  if (!(await bcrypt.compare(password, client.encryptedPassword)))
    throw new ClientPasswordAndEmailDoesNotMatchError();

  return jwtAuth.getClientJwt(client);
};
