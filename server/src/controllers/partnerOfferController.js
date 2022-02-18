const partnerOfferService = require("./../services/partnerOfferService");

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
  res.send({
    offer,
  });
};

module.exports = {
  getOffersByPartner,
  getPartnerOfferById,
};
