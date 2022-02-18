const bcrypt = require("bcrypt");
const formatClientData = require("./formatClientData");
const Client = require("../../models/Client");
const jwtAuth = require("./../../utils/jwtAuth");
const {
  ClientDoesNotExistsError,
  ClientPasswordAndEmailDoesNotMatchError,
} = require("./exceptions");

module.exports = async ({ email, password }) => {
  let client = await Client.findOne({ email, isVerified: true })
    .select(["-__v", "-ancestors", "-isVerified", "-isPaid"])
    .populate({
      path: "parent",
      select: ["profile", "_id", "ancestors"],
    });
  if (!client) throw new ClientDoesNotExistsError(401);
  if (!(await bcrypt.compare(password, client.encryptedPassword)))
    throw new ClientPasswordAndEmailDoesNotMatchError();

  return {
    authToken: jwtAuth.getClientJwt(client),
    client: formatClientData(client),
  };
};
