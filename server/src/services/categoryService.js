const Category = require("../models/Category");

const getHomePageCategories = async () => {
    const categories = await Category.find({
        showAtHome: true
    }).select(["_id", "name"]).limit(8);
    return categories;
}

module.exports = {
    getHomePageCategories
}