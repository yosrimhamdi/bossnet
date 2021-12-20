const { default: adminBro } = require("admin-bro");
const handler = require("./handler");

module.exports = {
    handler,
    component: adminBro.bundle("./components/index.jsx")
}