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
  getPartnerById: (id) => `/partners/${id}`,
  getOffersByPartnerId: (partnerId, page) =>
    `/partners/offers/${partnerId}/${page}`,
  getPartnerOfferById: (id) => `/partners/offers/${id}`,
  getCustomPageById: (id) => `/custom-pages/${id}`,

  createContact: "/contact/create",
};
export default API_ROUTES;
