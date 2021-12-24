const partnerService = require("./../services/partnerService");

/*
    params: [categoryId, page]
*/

const getPartnersByCategory = async (req, res) => {
    const { categoryId, page } = req.params;
    const partners = await partnerService.getPartnersByCategory(categoryId, page);
    res.send({
        partners
    });
}

module.exports = {
    getPartnersByCategory
}