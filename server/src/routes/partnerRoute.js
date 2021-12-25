const { Router } = require("express");
const partnerController = require("./../controllers/partnerController");
const partnerValidators = require("./../middlewares/validators/partnerValidators");

const partnerRouter = new Router();
partnerRouter
  .get(
    "/category/:categoryId/:page",
    partnerValidators.getPartnersByCategory,
    partnerController.getPartnersByCategory
  )
  .get(
    "/search-suggestions/:searchQuery",
    partnerValidators.getPartnersSuggestionsBySearchQuery,
    partnerController.getPartnersSuggestionsBySearchQuery
  )
  .get(
    "/search/:searchQuery/:page",
    partnerValidators.getPartnersBySearchQuery,
    partnerController.getPartnersBySearchQuery
  );

module.exports = {
  path: "/partners",
  route: partnerRouter,
};
