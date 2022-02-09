const {
  getHomePageAdvertissments,
} = require("../services/advertissementService");
const { getHomePageCategories } = require("../services/categoryService");
const { formatClientData } = require("../services/clientService");
const SiteSettings = require("./../models/SiteSettings");
const { getFooterCustomPages } = require("../services/customPageService");
const { getHomePageOffers } = require("../services/partnerOfferService");
const {
  getHomePagePartners,
  getHeaderPartners,
} = require("../services/partnerService");

const getHomePageData = async (_, res) => {
  const partners = await getHomePagePartners();
  const advertissments = await getHomePageAdvertissments();
  const offers = await getHomePageOffers();
  const categories = await getHomePageCategories();
  res.send({
    partners,
    advertissments,
    offers,
    categories,
  });
};
/*
Header - top partners,
Footer - custome pages,
Client - data if is authenticated
*/
const getBaseData = async (req, res) => {
  const response = {
    partners: await getHeaderPartners(),
    customPages: await getFooterCustomPages(),
    siteSettings: await SiteSettings.findOne(),
  };
  if (req.isAuthenticated) {
    response.client = formatClientData(req.client);
  }

  res.send(response);
};

module.exports = {
  getHomePageData,
  getBaseData,
};
