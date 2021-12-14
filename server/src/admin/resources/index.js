const adminResource = require("./adminResource");
const adminRoleResource = require("./adminRoleResource");
const advertissmentResource = require("./advertissmentResource");
const clientResource = require("./clientResource");
const contactResource = require("./contactResource");
const customPageResource = require("./customPageResource");
const clientEmailVerificationResource = require("./ClientEmailVerificationResource");

module.exports = [
    customPageResource,
    contactResource,
    advertissmentResource,

    adminResource,
    adminRoleResource,

    clientResource,
    clientEmailVerificationResource
];