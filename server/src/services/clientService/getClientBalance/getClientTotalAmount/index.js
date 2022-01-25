const getClientLeftRightChildsCountGroupedByTreeHeight = require("../getClientLeftRightChildsCountGroupedByTreeHeight");
const calcClientTotalAmount = require("./calcClientTotalAmount");

module.exports = async (clientId) => {
  const leftRightCountsGroupedByTreeHeight = await getClientLeftRightChildsCountGroupedByTreeHeight(
    clientId
  );
  return calcClientTotalAmount(leftRightCountsGroupedByTreeHeight);
};
