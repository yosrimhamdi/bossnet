export default function ({ $axios, redirect, app }, inject) {
  const api = $axios.create({
    baseURL: process.env.apiEndpoint,
  });
  api.onRequest((config) => {
    if (app.$auth.loggedIn) {
      const token = app.$auth.strategy.token.get().split(" ")[1];
      api.setToken(token, "Bearer");
    }
  });

  // Work with $api
  inject("api", api);

  api.onError((err) => {
    const code = parseInt(err.response && err.response.status);
    if (code == 404) {
      redirect("/404");
    }
    // else if (code == 400) {
    //   redirect("/"); // for unhandled errors like (url params errors, ...)
    // }
  });
}
