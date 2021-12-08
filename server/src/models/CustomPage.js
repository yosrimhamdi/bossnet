const mongoose = require("mongoose");
const { CUSTOM_PAGE } = require("./configs/collectionsNames");
const { REQUIRED_ERROR_MSG } = require("./configs/fieldsValidationMessages");

const customPageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        trim: true
    },
    description: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        trim: true
    },
    content: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG]
    }
}, { timestamps: true });

const CustomPage = mongoose.model(CUSTOM_PAGE, customPageSchema);
module.exports = CustomPage;