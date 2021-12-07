const mongoose = require("mongoose");
const { ADVERTISSMENT } = require("./configs/collectionsNames");
const duration = require("./embeded/duration");
const file = require("./embeded/file");
const { AD_POSITION_CHOICES } = require("./configs/enums");

const advertissmentSchema = new mongoose.Schema({
    image: file,
    title: { type: String, required: true },
    description: String,
    position: {
        type: String,
        enum: AD_POSITION_CHOICES.map((pos) => pos.value),
        required: true
    },
    duration: {
        type: duration,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    showAtHome: Boolean
}, { timestamps: true });

const Advertissment = mongoose.model(ADVERTISSMENT, advertissmentSchema);
module.exports = Advertissment;