const { Router } = require("express");
const baseDataController = require("./../controllers/baseDataController");
const provideAuthMiddleware = require("./../middlewares/provideAuth");

const homePageRouter = new Router();
homePageRouter
  .get("/home/data", baseDataController.getHomePageData)
  .get("/base/data", provideAuthMiddleware, baseDataController.getBaseData);

module.exports = {
  path: "",
  route: homePageRouter,
};
