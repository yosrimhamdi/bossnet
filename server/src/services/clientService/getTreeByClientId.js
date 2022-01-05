const Client = require("../../models/Client");
const getFindClientTreeWithChildsCountPipeline = require("./aggregations/getFindClientTreeWithChildsCountPipeline");
const { GetClientTreeNotAllowedError } = require("./exceptions");

// check if auth client has permission to get tree of specific client
const getClientTreeIsAllowed = async (clientId, authClientId) => {
  return (
    authClientId.toString() == clientId.toString() ||
    !!(await Client.findOne({ _id: clientId, ancestors: authClientId }))
  );
};

module.exports = async (clientId, authClientId) => {
  if (!getClientTreeIsAllowed(clientId, authClientId))
    throw new GetClientTreeNotAllowedError();

  const clients = await Client.aggregate(
    getFindClientTreeWithChildsCountPipeline(clientId)
  );
  return clients;
};
