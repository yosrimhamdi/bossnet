const hasPermission = require("../hasPermission");
const defaultOptions = require("./configs/defaultOptions");
const { CLIENT_GROUP } = require("./configs/navigationGroups");
const timestampsProperties = require("./configs/timestampsProperties");
const { CLIENT_PASSWORD_RESET } = require("../../models/configs/collectionsNames");
const ClientPasswordReset = require("../../models/ClientPasswordReset");


module.exports = {
    resource: ClientPasswordReset,
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
            delete: { isAccessible: hasPermission(CLIENT_PASSWORD_RESET, "canDelete") },
            show: {
                isAccessible: hasPermission(CLIENT_PASSWORD_RESET, "canView"),
                showInDrawer: true
            },
            list: { isAccessible: hasPermission(CLIENT_PASSWORD_RESET, "canView") },
        }
    }
}