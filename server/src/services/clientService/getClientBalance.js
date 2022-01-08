const Client = require("../../models/Client");
const getCalcClientBalancePipeline = require("./aggregations/getCalcClientBalancePipeline");

module.exports = async (clientId) => {
  const clientBalance = (
    await Client.aggregate(getCalcClientBalancePipeline(clientId))
  )[0];
  return clientBalance;
};
