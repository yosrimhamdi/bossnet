const Joi = require("joi");
const mongoose = require("mongoose");
const createJoiMongooseFieldValidate = require("../utils/createJoiMongooseFieldValidate");
const { CLIENT, CLIENT_PAYMENT } = require("./configs/collectionsNames");
const { CLIENT_PAYMENT_METHOD_CHOICES } = require("./configs/enums");
const {
  REQUIRED_ERROR_MSG,
  INVALID_ERROR_MSG,
} = require("./configs/fieldsValidationMessages");

const clientPaymentSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Types.ObjectId,
      ref: CLIENT,
      required: [true, REQUIRED_ERROR_MSG],
    },
    amount: {
      type: Number,
      required: [true, REQUIRED_ERROR_MSG],
      validate: createJoiMongooseFieldValidate(
        Joi.number().greater(0),
        INVALID_ERROR_MSG
      ),
    },
    paymentMethod: {
      type: String,
      enum: CLIENT_PAYMENT_METHOD_CHOICES.map((item) => item.value),
    },
    paidDate: {
      type: Date,
    },
    note: String,
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ClientPayment = mongoose.model(CLIENT_PAYMENT, clientPaymentSchema);

module.exports = ClientPayment;
