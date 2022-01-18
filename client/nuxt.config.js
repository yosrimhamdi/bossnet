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
      {
        hid: "description",
        name: "description",
        content: `Bossnet est une société qui renforce la relation entre le consommateur qui cherche les promotions pour toujours et le commerçant qui cherche à minimiser le coût de la publicité.`,
      },
      { name: "format-detection", content: "telephone=no" },
      {
        name: "og:locale",
        content: "fr_TN",
      },
      { name: "msapplication-TileColor", content: "#ffba00" },
      {
        name: "msapplication-TileImage",
        content: "/favicon/ms-icon-144x144.png",
      },
      { name: "theme-color", content: "#ffba00" },
    ],
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "57x57",
        href: "/favicon/apple-icon-57x57.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "60x60",
        href: "/favicon/apple-icon-60x60.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "72x72",
        href: "/favicon/apple-icon-72x72.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "76x76",
        href: "/favicon/apple-icon-76x76.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "114x114",
        href: "/favicon/apple-icon-114x114.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "120x120",
        href: "/favicon/apple-icon-120x120.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "144x144",
        href: "/favicon/apple-icon-144x144.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "152x152",
        href: "/favicon/apple-icon-152x152.png",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon/apple-icon-180x180.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/favicon/android-icon-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/favicon/favicon-96x96.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/favicon-16x16.png,",
      },
      { rel: "manifest", href: "/favicon/manifest.json" },
    ],
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
        token: {
          property: "authToken",
          global: true,
          type: "Bearer",
        },
        endpoints: {
          login: { url: `${apiEndpoint}/client/signin`, method: "post" },
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
    host: "0.0.0.0",
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
