const { ValidationError } = require("admin-bro");
const ClientPayment = require("../../../models/ClientPayment");
const {
  UNVALID_AMOUNT_ERROR_MSG,
  UNVALID_FIELD_ERROR_MSG,
} = require("../configs/customErrors");
const clientService = require("./../../../services/clientService");

const validateAmount = async (payload) => {
  if (payload.amount) {
    if (isNaN(payload.amount)) {
      throw new ValidationError({
        amount: {
          message: UNVALID_FIELD_ERROR_MSG,
        },
      });
    }
    if (payload.client) {
      let { unpaidAmount } = await clientService.getClientBalance(
        payload.client
      );
      if (payload._id) {
        // is updated
        unpaidAmount += (await ClientPayment.findById(payload._id)).amount;
      }
      const amount = Number.parseFloat(payload.amount);
      if (unpaidAmount < amount) {
        throw new ValidationError({
          amount: {
            message: UNVALID_AMOUNT_ERROR_MSG.replace(
              "%unpaidAmount",
              unpaidAmount.toLocaleString()
            ).replace("%enteredAmount", amount.toLocaleString()),
          },
        });
      }
    }
  }
};

module.exports = {
  handleBeforeSaveAction: async (req) => {
    if (req.method == "post") {
      await validateAmount(req.payload);
    }
    return req;
  },
};
