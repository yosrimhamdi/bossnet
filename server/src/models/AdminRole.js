const mongoose = require("mongoose");
const { ADMIN_ROLE } = require("./configs/collectionsNames");
const { REQUIRED_ERROR_MSG } = require("./configs/fieldsValidationMessages");
const permission = require("./embeded/permission");

const adminRoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        trim: true
    },
    permissions: {
        type: [permission],
        required: [true, REQUIRED_ERROR_MSG]
    }
}, { timestamps: true });

const AdminRole = mongoose.model(ADMIN_ROLE, adminRoleSchema);
module.exports = AdminRole;