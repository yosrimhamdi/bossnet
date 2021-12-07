const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const { ADMIN_PANEL_PATH, SECRET_COOKIE_CODE } = require('../config');
const resources = require('./../admin/resources');
const branding = require("./../admin/branding");
const authenticateAdmin = require('../admin/authenticateAdmin');
const locale = require("./../admin/locale");

AdminBro.registerAdapter(AdminBroMongoose);
module.exports = (expressApp, database) => {
    const adminBro = new AdminBro({
        databases: [database],
        resources,
        rootPath: ADMIN_PANEL_PATH,
        branding,
        locale
    });
    const adminBroRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
        authenticate: authenticateAdmin,
        cookiePassword: SECRET_COOKIE_CODE,
    });
    expressApp.use(ADMIN_PANEL_PATH, adminBroRouter);
}