const mongoose = require("mongoose");
const { ADMIN_ROLE } = require("./configs/collectionsNames");
const permission = require("./embeded/permission");

const adminRoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    permissions: {
        type: [permission],
        required: true
    }
}, { timestamps: true });

const AdminRole = mongoose.model(ADMIN_ROLE, adminRoleSchema);
module.exports = AdminRole;