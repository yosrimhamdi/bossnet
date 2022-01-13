import API_ROUTES from "../apiRoutes";

export default {
  async nuxtServerInit({ commit }, { app }) {
    const baseData = await app.$api.$get(API_ROUTES.getBaseData);
    commit("setBaseData", baseData);
    if (!baseData.client) {
      await app.$auth.logout();
    }
  },
  async logout({ commit }, isExpired = false) {
    await this.$auth.logout();
    commit("setClient", null);
    if (isExpired) {
      this.$router.push("/signin");
      this.$notify({ messageRef: "AUTH_TOKEN_EXPIRED_INFO" });
      return;
    }
    this.$router.push("/");
  },
};
