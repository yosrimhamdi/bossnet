require('dotenv').config();
module.exports = {
    DEBUG: process.env.MODE == "development",
    SECRET_JWT_CODE: process.env.SECRET_JWT_CODE,
    SECRET_COOKIE_CODE: process.env.SECRET_COOKIE_CODE,
    ADMIN_PANEL_PATH: process.env.ADMIN_PANEL_PATH || "/admin",
    MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bossnet-db-dev",
    PORT: process.env.PORT || "4000",
    CLIENT_ENDPOINT: process.env.CLIENT_ENDPOINT || "http://localhost:8080"
}