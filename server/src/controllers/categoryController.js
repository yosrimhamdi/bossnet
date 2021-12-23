const categoryService = require("../services/categoryService");


const getAllCategories = async (req, res) => {
    const categories = await categoryService.getAllCategories();

    res.send({
        categories
    });
}

module.exports = {
    getAllCategories
}