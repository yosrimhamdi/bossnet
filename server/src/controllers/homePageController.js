const { getHomePageAdvertissments } = require("../services/advertissementService");
const { getHomePageCategories } = require("../services/categoryService");
const { getHomePageOffers } = require("../services/partnerOfferService");
const { getHomePagePartners } = require("./../services/partnerService");


const getHomePageData = async (req, res) => {
    const partners = await getHomePagePartners();
    const advertissments = await getHomePageAdvertissments();
    const offers = await getHomePageOffers();
    const categories = await getHomePageCategories();
    res.send({
        partners,
        advertissments,
        offers,
        categories
    });
}

module.exports = {
    getHomePageData
}