const { Router } = require("express");
const partnerOfferController = require("./../controllers/partnerOfferController");
const partnerOfferValidators = require("./../middlewares/validators/partnerOfferValidators");

const partnerOfferRouter = new Router();

partnerOfferRouter
  .get(
    "/:partnerId/:page",
    partnerOfferValidators.getOffersByPartner,
    partnerOfferController.getOffersByPartner
  )
  .get(
    "/:offerId",
    partnerOfferValidators.getPartnerOfferById,
    partnerOfferController.getPartnerOfferById
  );

module.exports = {
  path: "/offers",
  route: partnerOfferRouter,
};
