const { Router } = require("express");
const partnerController = require("./../controllers/partnerController");
const partnerValidators = require("./../middlewares/validators/partnerValidators");
const partnerOfferRoute = require("./partnerOfferRoute");
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
    "/search/:page",
    ...partnerValidators.getPartnersBySearchQuery,
    partnerController.getPartnersBySearchQuery
  )
  .get(
    "/:partnerId",
    partnerValidators.getPartnerById,
    partnerController.getPartnerById
  );

partnerRouter.use(partnerOfferRoute.path, partnerOfferRoute.route);

module.exports = {
  path: "/partners",
  route: partnerRouter,
};
