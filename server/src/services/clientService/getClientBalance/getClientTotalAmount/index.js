const calcClientTotalAmount = require("./calcClientTotalAmount");
const getGetClientLeftRightChildsCountGroupedByTreeHeightPipeline = require("./../aggregations/getGetClientLeftRightChildsCountGroupedByTreeHeightPipeline");
const Client = require("../../../../models/Client");

const getClientLeftRightChildsCountGroupedByTreeHeight = async (clientId) => {
  const result = (
    await Client.aggregate(
      getGetClientLeftRightChildsCountGroupedByTreeHeightPipeline(clientId)
    )
  )[0];
  return result.leftRightChildsCountGroupedByTreeHeight;
};

module.exports = async (clientId) => {
  const leftRightCountsGroupedByTreeHeight =
    await getClientLeftRightChildsCountGroupedByTreeHeight(clientId);
  return calcClientTotalAmount(leftRightCountsGroupedByTreeHeight);
};
