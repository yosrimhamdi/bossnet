const adminResource = require("./adminResource");
const adminRoleResource = require("./adminRoleResource");
const advertissmentResource = require("./advertissmentResource");
const clientResource = require("./clientResource");
const contactResource = require("./contactResource");
const customPageResource = require("./customPageResource");
const clientEmailVerificationResource = require("./clientEmailVerificationResource");
const clientPasswordResetResource = require("./clientPasswordResetResource");
const clientPaymentResource = require("./clientPaymentResource");
const categoryResource = require("./categoryResource");
const partnerResource = require("./partnerResource");

module.exports = [
    customPageResource,
    contactResource,
    advertissmentResource,

    partnerResource,
    categoryResource,


    clientResource,
    clientPaymentResource,
    clientEmailVerificationResource,
    clientPasswordResetResource,

    adminResource,
    adminRoleResource,
];