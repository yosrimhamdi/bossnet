const Client = require("../../models/Client");
const clientUpdateIsAllowed = require("./clientUpdateIsAllowed");
const { ClientUpdateNotAllowedError } = require("./exceptions");

module.exports = async (
  clientId,
  {
    password,
    firstName,
    lastName,
    gender,
    mobilePhone,
    facebookAccountLink,
    cinId,
    rib,
  }
) => {
  if (!(await clientUpdateIsAllowed(clientId, password)))
    throw new ClientUpdateNotAllowedError();

  await Client.findByIdAndUpdate(clientId, {
    profile: {
      firstName,
      lastName,
      gender,
      mobilePhone,
      facebookAccountLink,
    },
    cinId,
    rib,
  });
};
