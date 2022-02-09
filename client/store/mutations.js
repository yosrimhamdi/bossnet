export default {
  setClient(state, client) {
    state.client = client;
  },
  setBaseData(state, { client, partners, customPages, siteSettings }) {
    state.client = client;
    state.footer = { customPages };
    state.header = { partners };
    state.siteSettings = siteSettings;
  },
};
