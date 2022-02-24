require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
export const API_ENDPOINT =
  process.env.API_ENDPOINT || "http://localhost:4000/api/v1";

export const MEDIA_PROVIDER_URL =
  process.env.MEDIA_PROVIDER_URL || "http://localhost:4000";

export const GOOGLE_RECAPTCHA_SITE_KEY = process.env.GOOGLE_RECAPTCHA_SITE_KEY;

export const HOST_NAME = process.env.HOST_NAME || "http://localhost:3000";

export const PORT = process.env.PORT || 3000;
