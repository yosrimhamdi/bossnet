const bcrypt = require("bcrypt");
const Client = require("../../models/Client");
const ClientPasswordReset = require("../../models/ClientPasswordReset");
const {
  ClientPasswordResetDoesNotExistsError,
  ClientPasswordResetExpiredError,
} = require("./exceptions");

const passwordTokenIsExpired = (clientPasswordReset) => {
  const twoHours = 2 * 60 * 60 * 1000;
  return new Date() - clientPasswordReset.createdAt > twoHours;
};

module.exports = async ({ clientId, resetKey, password }) => {
  const clientPasswordReset = await ClientPasswordReset.findOne({
    client: clientId,
    resetKey,
  });
  if (!clientPasswordReset) throw new ClientPasswordResetDoesNotExistsError();
  if (passwordTokenIsExpired(clientPasswordReset)) {
    await clientPasswordReset.delete();
    throw new ClientPasswordResetExpiredError();
  }
  await clientPasswordReset.delete();
  // change password
  const encryptedPassword = await bcrypt.hash(password, 8);
  await Client.findOneAndUpdate(
    { _id: clientId },
    {
      encryptedPassword,
    }
  );
};
