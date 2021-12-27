export default function ({ $axios, redirect }, inject) {
  const api = $axios.create({
    baseURL: process.env.apiEndpoint,
  });
  api.onRequest((config) => {
    console.log("Making request to " + config.url);
  });
  // work with $api
  inject("api", api);

  api.onError((err) => {
    const code = parseInt(err.response && err.response.status);
    if (code == 404) {
      redirect("/404");
    } else if (code == 400) {
      redirect("/"); // for unhandled errors like (url params errors, ...)
    }
  });
}
