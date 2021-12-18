const mongoose = require("mongoose");
const { ADMIN_ROLE } = require("./configs/collectionsNames");
const { REQUIRED_ERROR_MSG } = require("./configs/fieldsValidationMessages");
const permission = require("./embeded/permission");
const Admin = require("./Admin");


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


adminRoleSchema.post("findOneAndRemove", async function (doc) {
    // set deleted role to null for admins
    await Admin.updateMany({ role: doc._id, isSuperuser: false }, {
        role: null
    });
});

const AdminRole = mongoose.model(ADMIN_ROLE, adminRoleSchema);
module.exports = AdminRole;