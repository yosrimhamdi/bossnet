const { Router } = require("express");
const partnerController = require("./../controllers/partnerController");
const partnerValidators = require("./../middlewares/validators/partnerValidators");


const partnerRouter = new Router();
partnerRouter.get("/category/:categoryId/:page",
    partnerValidators.getPartnersByCategory,
    partnerController.getPartnersByCategory)

module.exports = {
    path: "/partners",
    route: partnerRouter
}