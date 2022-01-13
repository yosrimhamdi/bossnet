const partnerOfferService = require("./../services/partnerOfferService");
const responseErrorsMsgs = require("../config/responseErrorsMsgs");

/*
    params: [partnerId, page]
*/
const getOffersByPartner = async (req, res) => {
  const { partnerId, page } = req.params;
  const offers = await partnerOfferService.getOffersByPartner(partnerId, page);
  res.send({
    offers,
  });
};
/*
    params: [offerId]
*/
const getPartnerOfferById = async (req, res) => {
  const offer = await partnerOfferService.getPartnerOfferById(
    req.params.offerId
  );
  if (offer) {
    res.send({
      offer,
    });
    return;
  }
  res.status(404).send({
    error: responseErrorsMsgs.NOT_FOUND_MSG,
  });
};

module.exports = {
  getOffersByPartner,
  getPartnerOfferById,
};
