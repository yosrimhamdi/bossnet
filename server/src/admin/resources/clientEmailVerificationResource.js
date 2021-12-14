const ClientEmailVerification = require("../../models/ClientEmailVerification");
const hasPermission = require("../hasPermission");
const defaultOptions = require("./configs/defaultOptions");
const { CLIENT_GROUP } = require("./configs/navigationGroups");
const timestampsProperties = require("./configs/timestampsProperties");
const { CLIENT_EMAIL_VERIFICATION } = require("../../models/configs/collectionsNames");


module.exports = {
    resource: ClientEmailVerification,
    options: {
        ...defaultOptions,
        navigation: CLIENT_GROUP,
        properties: {
            ...timestampsProperties,
            _id: {
                isVisible: {
                    list: false,
                    show: true,
                    filter: true
                }
            },
        },
        actions: {
            new: { isAccessible: false },
            edit: { isAccessible: false },
            delete: { isAccessible: hasPermission(CLIENT_EMAIL_VERIFICATION, "canDelete") },
            show: { isAccessible: hasPermission(CLIENT_EMAIL_VERIFICATION, "canView") },
            list: { isAccessible: hasPermission(CLIENT_EMAIL_VERIFICATION, "canView") },
        }
    }
}