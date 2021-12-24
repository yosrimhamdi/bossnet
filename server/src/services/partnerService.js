const { PARTNER_TYPE_CHOICES } = require("../models/configs/enums");
const Partner = require("../models/Partner");

const PAGINATION_LIMIT = 8;

const getHomePagePartners = async () => {
    const platiniumPartners = await Partner.find({
        type: PARTNER_TYPE_CHOICES[0].value
    }).select(["_id", "logo", "name"]);

    return platiniumPartners;
}

const getPartnersByCategory = async (categoryId, page = 1) => {
    const paginatedPartners = await Partner.paginate({
        categories: categoryId,
    }, {
        page,
        limit: PAGINATION_LIMIT,
        select: ["-categories", "-email", "-images",
            "-location", "-timing", "-webSiteURL"]
    });

    return paginatedPartners;
}

module.exports = {
    getHomePagePartners,
    getPartnersByCategory
}