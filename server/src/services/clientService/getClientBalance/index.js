const getClientTotalAmount = require("./getClientTotalAmount");
const getClientPaidAmount = require("./getClientPaidAmount");

module.exports = async (clientId) => {
  const totalAmount = await getClientTotalAmount(clientId);
  const paidAmount = await getClientPaidAmount(clientId);

  return {
    paidAmount,
    totalAmount,
    unpaidAmount: totalAmount - paidAmount,
  };
};
