const handleEncryptedPasswordErrors = require("../utils/handleEncryptedPasswordErrors");
const handlePasswordEncryption = require("../utils/handlePasswordEncryption");
const handleUniqueEmailError = require("../utils/handleUniqueEmailError");

const getClientAncestors = async(parentId) => {
    console.log({ parentId });
    return [];
}

module.exports = {
    handleBeforeSaveAction: async(req) => {
        req.payload.ancestors = await getClientAncestors(req.payload.parent);
        handlePasswordEncryption(req.payload);
        return req;
    },
    handleAfterSaveAction: async(res) => {
        if (res.record && res.record.errors) {
            const { errors } = res.record;
            handleEncryptedPasswordErrors(errors);
            handleUniqueEmailError(errors);
        }
        console.log(res.payload);
        return res;
    }
}