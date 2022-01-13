const ClientPayment = require("../../models/ClientPayment");

const PAGINATION_LIMIT = 1;

module.exports = async (clientId, page = 1) => {
  const payments = await ClientPayment.paginate(
    {
      client: clientId,
      isPaid: true,
    },
    {
      page,
      limit: PAGINATION_LIMIT,
      sort: "-updatedAt",
      select: ["_id", "paymentMethod", "amount", "paidDate"],
    }
  );
  return payments;
};
