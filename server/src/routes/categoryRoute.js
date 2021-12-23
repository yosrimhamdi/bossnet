const { Router } = require("express");
const categoryController = require("./../controllers/categoryController");


const categoryRouter = new Router();
categoryRouter.get("/all", categoryController.getAllCategories);

module.exports = {
    path: "/categories",
    route: categoryRouter
}