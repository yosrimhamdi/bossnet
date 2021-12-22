const { Router } = require("express");
const homePageController = require("./../controllers/homePageController");


const homePageRouter = new Router();
homePageRouter.get("/data", homePageController.getHomePageData);

module.exports = {
    path: "/home",
    route: homePageRouter
};