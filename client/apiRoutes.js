const API_ROUTES = {
    getHomePageData: "/home/data",
    getAllCategories: "/categories/all",
    getCategoryById: (id) => `/categories/${id}`,
    getPartnersByCategoryId: (categoryId, page) => `/partners/category/${categoryId}/${page}`
}
export default API_ROUTES;