export default function ({ $axios, redirect, app, store }, inject) {
  const api = $axios.create({
    baseURL: process.env.apiEndpoint,
  });

  api.onRequest((config) => {
    // provide auth token to request
    try {
      if (app.$auth.loggedIn) {
        const token = app.$auth.strategy.token.get().split(" ")[1];
        api.setToken(token, "Bearer");
      }
    } catch (err) {
      // get token error ( throwed when client logout from another browser tab )
      store.dispatch("logout", true);
    }
  });

  api.onError((err) => {
    // handle global errors
    const code = parseInt(err.response && err.response.status);
    if (code == 404) {
      redirect("/404");
    } else if (code == 403) {
      const { error } = err.response.data;
      if (error == "UNAUTHORIZED_AUTH_ERROR") {
        store.dispatch("logout", true);
      }
    }
  });

  inject("api", api);
}
