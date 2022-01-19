export default function ({ $axios, redirect, app, store }, inject) {
  const api = $axios.create({
    baseURL: process.env.apiEndpoint,
  });

  api.onRequest((config) => {
    // provide auth token to request (interceptor)
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
    const error = err?.response?.data?.error;
    if (code == 404) {
      redirect("/404");
    } else if (code == 401) {
      if (error == "UNAUTHORIZED_AUTH_ERROR") {
        store.dispatch("logout", true);
      }
    } else if (code == 429 && error == "TOO_MANY_REQUESTS_ERROR") {
      app.$notify({ messageRef: error });
    }
  });

  inject("api", api);
}
