const API_ROUTES = {
  getBaseData: "/base/data",
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
  signUp: "/client/signup",
  signIn: "/client/signin",
  resetPasswordRequest: "/client/reset-password/request",
  resetPassword: "/client/reset-password",
};
export default API_ROUTES;
