const ClientPasswordReset = require("../../models/ClientPasswordReset");
const randtoken = require("rand-token");
const Client = require("../../models/Client");
const { ClientDoesNotExistsError } = require("./exceptions");
const sendResetPasswordRequestMail = require("./sendResetPasswordRequestMail");

const deleteOldPasswordResets = async (clientId) => {
  return await ClientPasswordReset.deleteMany({ client: clientId });
};

const createNewPasswordReset = async (clientId) => {
  return await ClientPasswordReset.create({
    client: clientId,
    resetKey: randtoken.generate(30),
  });
};

module.exports = async (clientEmail) => {
  const client = await Client.findOne({ email: clientEmail, isVerified: true });
  if (!client) throw new ClientDoesNotExistsError();

  await deleteOldPasswordResets(client._id);
  const passwordReset = await createNewPasswordReset(client._id);

  await sendResetPasswordRequestMail(
    client.email,
    client._id,
    passwordReset.resetKey
  );
};
