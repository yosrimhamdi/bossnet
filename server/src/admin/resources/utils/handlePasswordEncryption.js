const bcrypt = require("bcrypt");
// copy password field to encryptedPassword with encryption
module.exports = async(payload) => {
    if (payload.password) {
        payload.encryptedPassword = bcrypt.hashSync(payload.password, 10);
        delete payload.password;
    }
}