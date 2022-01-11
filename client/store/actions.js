import API_ROUTES from "../apiRoutes";

export default {
  async nuxtServerInit({ commit }, { app }) {
    const baseData = await app.$api.$get(API_ROUTES.getBaseData);
    commit("setBaseData", baseData);
  },
};
