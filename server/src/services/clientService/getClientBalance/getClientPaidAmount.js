const ClientPayment = require("../../../models/ClientPayment");
const getCalcClientPaidAmountPipeline = require("./aggregations/getCalcClientPaidAmountPipeline");

module.exports = async (clientId) => {
  const result = await ClientPayment.aggregate(
    getCalcClientPaidAmountPipeline(clientId)
  );
  return (result.length && result[0].amount) || 0;
};
