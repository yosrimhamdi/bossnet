const Contact = require("../../models/Contact");
const hasPermission = require("../hasPermission");
const { CONTACT } = require("../../models/configs/collectionsNames");
const { PUBLIC_GROUP } = require("./configs/navigationGroups");
const timestampsProperties = require("./configs/timestampsProperties");

module.exports = {
    resource: Contact,
    options: {
        navigation: PUBLIC_GROUP,
        properties: {
            ...timestampsProperties,
            _id: {
                isVisible: {
                    list: false,
                    show: true
                }
            },
            message: {
                type: "textarea",
                isVisible: {
                    list: false,
                    show: true,
                    edit: true
                },
            },
            companyName: {
                isVisible: {
                    list: false,
                    show: true,
                    edit: true
                }
            },
            mobilePhone: {
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
            show: {
                isAccessible: hasPermission(CONTACT, "canView"),
                showInDrawer: true
            },
            list: { isAccessible: hasPermission(CONTACT, "canView") },
        }
    }
}