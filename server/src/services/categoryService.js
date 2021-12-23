const Category = require("../models/Category");

const getHomePageCategories = async () => {
    const categories = await Category.find({
        showAtHome: true
    }).select(["_id", "name"]).limit(8);
    return categories;
}

const getAllCategories = async () => {
    const allCategories = await Category.find()
        .select(["-searchKeys", "-showAtHome"]);
    return allCategories;
}

module.exports = {
    getHomePageCategories,
    getAllCategories
}