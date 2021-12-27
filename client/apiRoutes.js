const API_ROUTES = {
  getHomePageData: "/home/data",
  getAllCategories: "/categories/all",
  getCategoryById: (id) => `/categories/${id}`,
  getPartnersByCategoryId: (categoryId, page) =>
    `/partners/category/${categoryId}/${page}`,
  getPartnersSuggestionsBySearchQuery: (searchQuery) =>
    `/partners/search-suggestions/${searchQuery}`,
  getPartnersBySearchKey: (searchQuery, page) =>
    `/partners/search/${page}${
      searchQuery ? `?searchQuery=${searchQuery}` : ""
    }`,
  getPartnerById: (partnerId) => `/partners/${partnerId}`,
  getOffersByPartnerId: (partnerId, page) =>
    `/partners/offers/${partnerId}/${page}`,
  getPartnerOfferById: (offerId) => `/partners/offers/${offerId}`,
};
export default API_ROUTES;
