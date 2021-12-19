const { ValidationError } = require("admin-bro");
const Client = require("../../../models/Client");
const { DIRECTION_UPDATE_ERROR_MSG, PARENT_UPDATE_ERROR_MSG } = require("../configs/customErrors");
const handleEncryptedPasswordErrors = require("../utils/handleEncryptedPasswordErrors");
const handlePasswordEncryption = require("../utils/handlePasswordEncryption");
const handleUniqueEmailError = require("../utils/handleUniqueEmailError");

const preventParentAndDirectionUpdate = async (payload) => {
    const clientToUpdate = await Client.findById(payload._id);
    if (clientToUpdate) {
        if (clientToUpdate.parent.toString() != payload.parent) {
            throw new ValidationError({
                parent: {
                    message: PARENT_UPDATE_ERROR_MSG
                }
            })
        }
        if (clientToUpdate.direction != payload.direction) {
            throw new ValidationError({
                direction: {
                    message: DIRECTION_UPDATE_ERROR_MSG
                }
            })
        }
    }
}


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
        if (res.record && res.record.errors) {
            const { errors } = res.record;
            handleEncryptedPasswordErrors(errors);
            handleUniqueEmailError(errors);
        }
        return res;
    }
}