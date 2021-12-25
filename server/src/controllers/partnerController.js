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
    params: [searchQuery, page]
    query: []
*/
const getPartnersBySearchQuery = async (req, res) => {
  const { searchQuery, page } = req.params;
  const partners = await partnerService.getPartnersBySearchQuery(
    searchQuery,
    page
  );
  res.send({
    partners,
  });
};
/*
    params: [searchQuery, page]
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

module.exports = {
  getPartnersByCategory,
  getPartnersBySearchQuery,
  getPartnersSuggestionsBySearchQuery,
};
