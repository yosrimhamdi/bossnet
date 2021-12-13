const handleEncryptedPasswordErrors = require("../utils/handleEncryptedPasswordErrors");
const handlePasswordEncryption = require("../utils/handlePasswordEncryption");
const handleUniqueEmailError = require("../utils/handleUniqueEmailError");
const setClientAncestors = require("./utils/setClientAncestors");
const validateClientCustomErrors = require("./utils/validateClientCustomErrors");



module.exports = {
    handleBeforeSaveAction: async (req) => {
        if (req.method == "post") {
            await validateClientCustomErrors(req.payload);
            await setClientAncestors(req.payload);
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