const Client = require("../../models/Client");
const bcrypt = require("bcrypt");
const clientUpdateIsAllowed = require("./clientUpdateIsAllowed");
const { ClientUpdateNotAllowedError } = require("./exceptions");

module.exports = async (clientId, { currentPassword, newPassword }) => {
  if (!(await clientUpdateIsAllowed(clientId, currentPassword)))
    throw new ClientUpdateNotAllowedError();

  const encryptedPassword = await bcrypt.hash(newPassword, 8);

  await Client.findByIdAndUpdate(clientId, {
    encryptedPassword,
  });
};
