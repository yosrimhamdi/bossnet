const Client = require("../../models/Client");
const getCountClientChildrenPipeline = require("./aggregations/getCountClientChildrenPipeline");

module.exports = async (clientId) => {
  const childrenCount = (
    await Client.aggregate(getCountClientChildrenPipeline(clientId))
  )[0];
  return childrenCount;
};
