const mongoose = require("mongoose");
const { CATEGORY } = require("./configs/collectionsNames");
const { REQUIRED_ERROR_MSG } = require("./configs/fieldsValidationMessages");
const Partner = require("./Partner");

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
    },
    showAtHome: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

categorySchema.index({
    name: "text",
    searchKeys: "text"
}, {
    default_language: "french"
});

categorySchema.post("findOneAndRemove", async function (doc) {
    // remove category from partner categories
    await Partner.updateMany({ categories: doc._id }, {
        $pull: {
            categories: doc._id
        }
    });
});


const Category = mongoose.model(CATEGORY, categorySchema);
Category.createIndexes(() => console.log("Category indexes done!"));
module.exports = Category;