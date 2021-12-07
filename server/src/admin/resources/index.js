const adminResource = require("./adminResource");
const adminRoleResource = require("./adminRoleResource");
const advertissmentResource = require("./advertissmentResource");
const contactResource = require("./contactResource");
const customPageResource = require("./customPageResource");

module.exports = [
    customPageResource,
    contactResource,
    advertissmentResource,

    adminResource,
    adminRoleResource,
];