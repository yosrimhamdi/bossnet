const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    startDate: {
        type: Date,
        default: () => Date.now,
        required: true
    },
    endDate: {
        type: Date,
        default: null // has no end
    }
}, {
    _id: false,
    versionKey: false
});