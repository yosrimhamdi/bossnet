export default {
  setClient(state, client) {
    state.client = client;
  },
  setBaseData(state, { client, partners, customPages }) {
    state.client = client;
    state.footer = { customPages };
    state.header = { partners };
  },
};
