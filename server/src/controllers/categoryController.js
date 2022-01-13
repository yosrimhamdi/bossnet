const categoryService = require("../services/categoryService");
const responseErrorsMsgs = require("../config/responseErrorsMsgs");

const getAllCategories = async (req, res) => {
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
  if (category) {
    res.send({
      category,
    });
    return;
  }
  res.status(404).send({
    error: responseErrorsMsgs.NOT_FOUND_MSG,
  });
};

module.exports = {
  getAllCategories,
  getCategoryById,
};
