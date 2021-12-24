const { Router } = require("express");
const categoryController = require("./../controllers/categoryController");
const categoryValidators = require("./../middlewares/validators/categoryValidators");

const categoryRouter = new Router();
categoryRouter.get("/all", categoryController.getAllCategories)
    .get("/:categoryId",
        categoryValidators.getCategoryById,
        categoryController.getCategoryById);

module.exports = {
    path: "/categories",
    route: categoryRouter
}