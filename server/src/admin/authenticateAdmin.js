const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

module.exports = async(email, password) => {
    const admin = await Admin.findOne({ email }).populate("role");
    // return admin;
    if (admin && bcrypt.compareSync(password, admin.encryptedPassword)) {
        return admin;
    }
    return false;
}