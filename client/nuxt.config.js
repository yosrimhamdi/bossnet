const apiEndpoint = process.env.API_ENDPOINT || "http://localhost:4000/api/v1";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Bossnet",
    htmlAttrs: {
      lang: "fr",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      {
        name: "og:locale",
        content: "fr_TN",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  env: {
    mediaProviderUrl: process.env.MEDIA_PROVIDER_URL || "http://localhost:4000",
    apiEndpoint,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/axios", "~/plugins/notifications"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    [
      "nuxt-lazy-load",
      {
        defaultImage: "/lazyLoading.jpg",
        directiveOnly: true,
      },
    ],
    [
      "@nuxtjs/recaptcha",
      {
        siteKey:
          process.env.GOOGLE_RECAPTCHA_SITE_KEY ||
          "6LfhxNMdAAAAADJj9ODuxEcJKcnoE_PSplLtFdSn", // Site key for requests
        version: 3, // Version
      },
    ],
    "@nuxtjs/auth-next",
  ],
  auth: {
    localStorage: false,
    strategies: {
      local: {
        // scheme: "refresh",
        token: {
          property: "authToken",
          global: true,
          type: "Bearer",
        },
        // refreshToken: {
        //   property: "refreshAuthToken",
        //   data: "refreshAuthToken",
        //   maxAge: 60 * 60 * 24 * 30,
        // },
        endpoints: {
          login: { url: `${apiEndpoint}/client/signin`, method: "post" },
          // refresh: {
          //   url: `${apiEndpoint}/client/refresh-token`,
          //   method: "post",
          // },
          // logout: { url: '/api/auth/logout', method: 'post' },
          user: false,
          logout: false,
        },
      },
    },
    redirect: false,
    autoLogout: true,
  },

  loading: {
    color: "#FFBA00",
    height: "2px",
  },
  server: {
    // host: "0.0.0.0",
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
