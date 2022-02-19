const { getAllCategoriesForSeo } = require("../services/categoryService");
const { getAllCustomPagesForSeo } = require("../services/customPageService");
const { getAllOffersForSeo } = require("../services/partnerOfferService");
const { getAllPartnersForSeo } = require("../services/partnerService");

const getSeoData = async (_, res) => {
  res.send({
    categories: await getAllCategoriesForSeo(),
    offers: await getAllOffersForSeo(),
    partners: await getAllPartnersForSeo(),
    customPages: await getAllCustomPagesForSeo(),
  });
};

module.exports = {
  getSeoData,
};
