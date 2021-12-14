const mongoose = require("mongoose");
const { CLIENT, CLIENT_PASSWORD_RESET } = require("./configs/collectionsNames");

const clientPasswordResetSchema = new mongoose.Schema({
    resetCode: {
        type: Number,
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

const ClientPasswordReset = mongoose.model(CLIENT_PASSWORD_RESET, clientPasswordResetSchema);

module.exports = ClientPasswordReset;