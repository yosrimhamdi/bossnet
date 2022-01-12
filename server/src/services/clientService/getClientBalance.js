const Client = require("../../models/Client");
const getCalcClientBalanceBefore10HeightPipeline = require("./aggregations/balance/getCalcClientBalanceBefore10HeightPipeline");
const getCalcClientBlanaceAfter10HeightPipeline = require("./aggregations/balance/getCalcClientBlanaceAfter10HeightPipeline");
const getCalcClientPaidAmountPipeline = require("./aggregations/balance/getCalcClientPaidAmountPipeline");
const getCheckIfClientHasReached10HeightPipeline = require("./aggregations/balance/getCheckIfClientHasReached10HeightPipeline");

const clientHasReached10Height = async (clientId) => {
  const result = (
    await Client.aggregate(getCheckIfClientHasReached10HeightPipeline(clientId))
  )[0];

  return result && result.clientHasReached10Height;
};

module.exports = async (clientId) => {
  const paidAmount = (
    await Client.aggregate(getCalcClientPaidAmountPipeline(clientId))
  )[0].paidAmount;
  let totalAmount;
  if (await clientHasReached10Height(clientId)) {
    totalAmount = (
      await Client.aggregate(
        getCalcClientBlanaceAfter10HeightPipeline(clientId)
      )
    )[0].totalAmount;
  } else {
    totalAmount = (
      await Client.aggregate(
        getCalcClientBalanceBefore10HeightPipeline(clientId)
      )
    )[0].totalAmount;
  }

  return {
    paidAmount,
    totalAmount,
    unpaidAmount: totalAmount - paidAmount,
  };
};
