const { ValidationError } = require("admin-bro");
const Client = require("../../../models/Client");
const {
  DIRECTION_UPDATE_ERROR_MSG,
  PARENT_UPDATE_ERROR_MSG,
} = require("../configs/customErrors");
const handleEncryptedPasswordErrors = require("../utils/handleEncryptedPasswordErrors");
const handlePasswordEncryption = require("../utils/handlePasswordEncryption");
const handleUniqueEmailError = require("../utils/handleUniqueEmailError");
const clientService = require("./../../../services/clientService");

const preventParentAndDirectionUpdate = async (payload) => {
  const clientToUpdate = await Client.findById(payload._id);
  if (clientToUpdate) {
    if (
      (clientToUpdate.parent &&
        clientToUpdate.parent.toString() != payload.parent) ||
      clientToUpdate.parent != payload.parent
    ) {
      throw new ValidationError({
        parent: {
          message: PARENT_UPDATE_ERROR_MSG,
        },
      });
    }
    if (clientToUpdate.direction != payload.direction) {
      throw new ValidationError({
        direction: {
          message: DIRECTION_UPDATE_ERROR_MSG,
        },
      });
    }
  }
};

module.exports = {
  handleBeforeCreateAction: async (req) => {
    if (req.method == "post") {
      handlePasswordEncryption(req.payload);
    }
    return req;
  },
  handleBeforeUpdateAction: async (req) => {
    if (req.method == "post") {
      await preventParentAndDirectionUpdate(req.payload);
      handlePasswordEncryption(req.payload);
    }
    return req;
  },
  handleAfterSaveAction: async (res) => {
    const { record } = res;

    if (!Object.keys(record.errors).length) {
      const { params } = record;

      params.profile = {
        firstName: params["profile.firstName"],
        lastName: params["profile.lastName"],
        mobilePhone: params["profile.mobilePhone"],
      };

      clientService.generateQRCode(params);
    }

    if (record && record.errors) {
      const { errors } = record;
      handleEncryptedPasswordErrors(errors);
      handleUniqueEmailError(errors);
    }
    return res;
  },
  showHandler: async (req, res, data) => {
    const clientId = data.record.params._id;
    data.record.params.balance = await clientService.getClientBalance(clientId);
    data.record.params.leftRightChildsCountGroupedByTreeHeight = await clientService.getClientLeftRightChildsCountGroupedByTreeHeight(
      clientId
    );

    const record = data.record.toJSON(data.currentAdmin);
    return {
      record,
    };
  },
};
