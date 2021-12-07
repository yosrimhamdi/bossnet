const mongoose = require("mongoose");
const { ADMIN_ROLE, ADMIN } = require("./configs/collectionsNames");
const adminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    isSuperuser: {
        type: Boolean,
        default: false,
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: ADMIN_ROLE
    }
}, { timestamps: true });

const Admin = mongoose.model(ADMIN, adminSchema);
module.exports = Admin;