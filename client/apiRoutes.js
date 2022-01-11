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
  getTreeByClientId: (clientId) => `/client/tree/${clientId}`,
  getAuthClientChildren: (page) => `/client/children/${page}`,
  updateClientData: "/client/update/data",
  updateClientPassword: "/client/update/password",
};
export default API_ROUTES;
