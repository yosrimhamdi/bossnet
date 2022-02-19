const { Router } = require("express");
const baseDataController = require("./../controllers/seoController");

const seoRouter = new Router();

seoRouter.get("/data", baseDataController.getSeoData);

module.exports = {
  path: "/seo",
  route: seoRouter,
};
