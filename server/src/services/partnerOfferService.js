const PartnerOffer = require("../models/PartnerOffer");
const { NotFoundError } = require("./exceptions");

const PAGINATION_LIMIT = 8;

const getHomePageOffers = async () => {
  const currentDate = new Date();
  //  currentDate.setHours(0, 0, 0, 0);
  const offers = await PartnerOffer.find({
    showAtHome: true,
    $or: [
      { "duration.endDate": null },
      {
        "duration.endDate": {
          $gte: currentDate,
        },
      },
    ],
    "duration.startDate": {
      $lte: currentDate,
    },
  }).select(["-relatedOffers", "-duration", "-partner", "-showAtHome"]);

  return offers;
};

const getOffersByPartner = async (partnerId, page = 1) => {
  const offers = await PartnerOffer.paginate(
    {
      partner: partnerId,
    },
    {
      page,
      limit: PAGINATION_LIMIT,
      sort: "-updatedAt",
      select: ["-partner", "-relatedOffers", "-showAtHome"],
    }
  );
  return offers;
};

const getPartnerOfferById = async (offerId) => {
  const offer = await PartnerOffer.findById(offerId)
    .populate([
      {
        path: "partner",
        select: ["_id", "name"],
      },
      {
        path: "relatedOffers",
        select: ["-partner", "-relatedOffers", "-showAtHome"],
      },
    ])
    .select("-showAtHome");
  if (!offer) {
    throw new NotFoundError();
  }
  return offer;
};

const getAllOffersForSeo = () => PartnerOffer.find().select("_id");

module.exports = {
  getHomePageOffers,
  getOffersByPartner,
  getPartnerOfferById,
  getAllOffersForSeo,
};
