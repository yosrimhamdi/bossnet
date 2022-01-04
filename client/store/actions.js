import API_ROUTES from "../apiRoutes";

export default {
  async nuxtServerInit({ commit }, { app }) {
    const baseData = await app.$api.$get(API_ROUTES.getBaseData);
    commit("setBaseData", baseData);
  },

  async fetchClientTree({ commit, state }, clientId) {
    commit("setClientTree", { isLoading: true });
    const response = await this.$api.$get(
      API_ROUTES.getTreeByClientId(clientId)
    );
    commit("setClientTree", { isLoading: false, clients: response.tree });
  },
};
