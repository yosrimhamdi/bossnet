const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const { ADMIN_PANEL_PATH, SECRET_COOKIE_CODE } = require("../config");
const resources = require("./../admin/resources");
const branding = require("./../admin/branding");
const authenticateAdmin = require("../admin/authenticateAdmin");
const locale = require("./../admin/locale");
const createInitialSuperuser = require("../utils/createInitialSuperuser");
const dashboard = require("./../admin/dashboard");
const assets = require("./../admin/assets");
const globalActions = require("../admin/globalActions");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redis = require("redis");
const convertDurationToSeconds = require("../utils/convertDurationToSeconds");

AdminBro.registerAdapter(AdminBroMongoose);
AdminBro.ACTIONS.list.handler = globalActions.list;

module.exports = async (expressApp) => {
  const adminBro = new AdminBro({
    resources,
    rootPath: ADMIN_PANEL_PATH,
    assets,
    branding,
    dashboard,
    locale,
  });
  const adminBroRouter = AdminBroExpress.buildAuthenticatedRouter(
    adminBro,
    {
      authenticate: authenticateAdmin,
      cookiePassword: SECRET_COOKIE_CODE,
    },
    null,
    {
      cookie: { maxAge: 1000 * convertDurationToSeconds("1day") },
      store: new RedisStore({
        client: redis.createClient(),
      }),
      resave: true,
      saveUninitialized: true,
    }
  );
  await createInitialSuperuser();
  expressApp.use(ADMIN_PANEL_PATH, adminBroRouter);
};
