const Contact = require("../../models/Contact");
const hasPermission = require("../hasPermission");
const { CONTACT } = require("../../models/configs/collectionsNames");
const { PUBLIC_GROUP } = require("./configs/navigationGroups");

module.exports = {
    resource: Contact,
    options: {
        navigation: PUBLIC_GROUP,
        properties: {
            _id: {
                isVisible: {
                    list: false,
                    show: true
                }
            },
            message: {
                isVisible: {
                    list: false,
                    show: true,
                    edit: true
                }
            },
        },
        actions: {
            new: { isAccessible: hasPermission(CONTACT, "canCreate") },
            edit: { isAccessible: hasPermission(CONTACT, "canModify") },
            delete: { isAccessible: hasPermission(CONTACT, "canDelete") },
            show: { isAccessible: hasPermission(CONTACT, "canView") },
            list: { isAccessible: hasPermission(CONTACT, "canView") },
        }
    }
}