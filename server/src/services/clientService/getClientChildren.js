const Client = require("../../models/Client");
const getFindClientChildrenWithChildsCountAndPaginationPipeline = require("./aggregations/getFindClientChildrenWithChildsCountAndPaginationPipeline");

module.exports = async (clientId, page = 1) => {
  const children = (
    await Client.aggregate(
      getFindClientChildrenWithChildsCountAndPaginationPipeline(clientId, page)
    )
  )[0];

  return children;
};
