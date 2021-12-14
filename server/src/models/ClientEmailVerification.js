const mongoose = require("mongoose");
const { CLIENT, CLIENT_EMAIL_VERIFICATION } = require("./configs/collectionsNames");

const clientEmailVerificationSchema = new mongoose.Schema({
    verificationKey: {
        type: String,
        required: true
    },
    client: {
        type: mongoose.Types.ObjectId,
        ref: CLIENT,
        required: true
    }
}, {
    timestamps: true
});

const ClientEmailVerification = mongoose.model(CLIENT_EMAIL_VERIFICATION, clientEmailVerificationSchema);

module.exports = ClientEmailVerification;