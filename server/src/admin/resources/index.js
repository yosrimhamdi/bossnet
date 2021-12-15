const adminResource = require("./adminResource");
const adminRoleResource = require("./adminRoleResource");
const advertissmentResource = require("./advertissmentResource");
const clientResource = require("./clientResource");
const contactResource = require("./contactResource");
const customPageResource = require("./customPageResource");
const clientEmailVerificationResource = require("./clientEmailVerificationResource");
const clientPasswordResetResource = require("./clientPasswordResetResource");
const clientPaymentResource = require("./clientPaymentResource");

module.exports = [
    customPageResource,
    contactResource,
    advertissmentResource,

    adminResource,
    adminRoleResource,

    clientResource,
    clientPaymentResource,
    clientEmailVerificationResource,
    clientPasswordResetResource
];