require("dotenv").config();
module.exports = {
  DEBUG: process.env.NODE_ENV == "development",
  JWT_SECRET_CODE: process.env.SECRET_JWT_CODE,
  JWT_EXPIRES_IN: "2d",
  SECRET_COOKIE_CODE: process.env.SECRET_COOKIE_CODE,
  ADMIN_PANEL_PATH: process.env.ADMIN_PANEL_PATH || "/admin",
  MONGO_URI:
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bossnet-db-dev",
  PORT: process.env.PORT || "4000",
  CLIENT_ENDPOINT: process.env.CLIENT_ENDPOINT || "http://localhost:3000",
  REST_API_VERSION_1_ENDPOINT:
    process.env.REST_API_VERSION_1_ENDPOINT || "/api/v1",
  INIT_ADMIN_PASSWORD: process.env.INIT_ADMIN_PASSWORD || "azerty",
  INIT_ADMIN_EMAIL: process.env.INIT_ADMIN_EMAIL || "bossnet@admin.com",
  GOOGLE_RECAPTCHA_SECRET_KEY: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
  AXIOS_TIMEOUT: Number.parseInt(process.env.AXIOS_TIMEOUT) || 3000,

  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,

  INIT_SITE_SETTINGS: {
    phoneNumbers: ["+216 45 567 778"],
    locations: ["Rue saleh ben yousef bannen، Monastir 5025"],
    email: "bossnet@contact.com",
  },
};
