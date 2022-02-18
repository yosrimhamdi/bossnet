const categoryService = require("../services/categoryService");

const getAllCategories = async (_, res) => {
  const categories = await categoryService.getAllCategories();
  res.send({
    categories,
  });
};

/*
    params: [categoryId]
*/
const getCategoryById = async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.categoryId);
  res.send({
    category,
  });
};

module.exports = {
  getAllCategories,
  getCategoryById,
};
