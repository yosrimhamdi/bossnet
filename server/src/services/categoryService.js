const Category = require("../models/Category");
const { NotFoundError } = require("./exceptions");

const getHomePageCategories = async () => {
  const categories = await Category.find({
    showAtHome: true,
  })
    .select(["_id", "name"])
    .limit(8);
  return categories;
};

const getAllCategories = async () => {
  const allCategories = await Category.find()
    .select(["-searchKeys", "-showAtHome"])
    .sort("-updatedAt");
  return allCategories;
};

const getCategoryById = async (categoryId) => {
  const category = await Category.findById(categoryId).select([
    "-searchKeys",
    "-showAtHome",
  ]);
  if (!category) {
    throw new NotFoundError();
  }
  return category;
};

const getCategoriesIdsBySearchQuery = async (searchQuery) => {
  const categories = await Category.find({
    $text: {
      $search: searchQuery,
    },
  }).select(["_id"]);
  return categories;
};

module.exports = {
  getHomePageCategories,
  getAllCategories,
  getCategoryById,
  getCategoriesIdsBySearchQuery,
};
