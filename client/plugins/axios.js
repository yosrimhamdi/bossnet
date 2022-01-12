export default function ({ $axios, redirect, app, store }, inject) {
  const api = $axios.create({
    baseURL: process.env.apiEndpoint,
  });

  api.onRequest(() => {
    // provide auth token to request
    if (app.$auth.loggedIn) {
      const token = app.$auth.strategy.token.get().split(" ")[1];
      api.setToken(token, "Bearer");
    }
  });

  api.onError(async (err) => {
    // handle global errors
    const code = parseInt(err.response && err.response.status);
    if (code == 404) {
      redirect("/404");
    } else if (code == 403) {
      const { error } = err.response.data;
      if (error == "UNAUTHORIZED_AUTH_ERROR") {
        await app.$auth.logout();
        store.commit("setClient", null);
        redirect("/signin");
      }
    }
  });

  inject("api", api);
}
