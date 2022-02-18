const partnerService = require("./../services/partnerService");

/*
    params: [categoryId, page]
*/
const getPartnersByCategory = async (req, res) => {
  const { categoryId, page } = req.params;
  const partners = await partnerService.getPartnersByCategory(categoryId, page);
  res.send({
    partners,
  });
};

/*
    params: [page]
    query: [searchQuery?]
*/
const getPartnersBySearchQuery = async (req, res) => {
  const { page } = req.params;
  const { searchQuery } = req.query;
  let partners;
  if (searchQuery) {
    partners = await partnerService.getPartnersBySearchQuery(searchQuery, page);
  } else {
    partners = await partnerService.getPartners(page);
  }
  res.send({
    partners,
  });
};
/*
    params: [searchQuery]
*/
const getPartnersSuggestionsBySearchQuery = async (req, res) => {
  const partners = await partnerService.getPartnersBySearchQuery(
    req.params.searchQuery,
    1,
    ["_id", "name"]
  );
  res.send({
    partners: partners.docs,
    total: partners.totalDocs,
  });
};

const getPartnerById = async (req, res) => {
  const partner = await partnerService.getPartnerById(req.params.partnerId);
  res.send({
    partner,
  });
};

module.exports = {
  getPartnersByCategory,
  getPartnersBySearchQuery,
  getPartnersSuggestionsBySearchQuery,
  getPartnerById,
};
