const mongoose = require("mongoose");
const { CUSTOM_PAGE } = require("./configs/collectionsNames");

const customPageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

const CustomPage = mongoose.model(CUSTOM_PAGE, customPageSchema);
module.exports = CustomPage;