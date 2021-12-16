const mongoose = require("mongoose");
const { CATEGORY } = require("./configs/collectionsNames");
const { REQUIRED_ERROR_MSG } = require("./configs/fieldsValidationMessages");


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        trim: true
    },
    description: {
        type: String,
        required: [true, REQUIRED_ERROR_MSG],
        trim: true
    },
    searchKeys: {
        type: [{
            type: String,
            required: [true, REQUIRED_ERROR_MSG],
            trim: true
        }],
        required: [true, REQUIRED_ERROR_MSG],
    }
}, {
    timestamps: true
});

const Category = mongoose.model(CATEGORY, categorySchema);

module.exports = Category;