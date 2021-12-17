const Category = require("../../models/Category");
const { CATEGORY } = require("../../models/configs/collectionsNames");
const hasPermission = require("../hasPermission");
const defaultOptions = require("./configs/defaultOptions");
const { PARTNER_GROUP } = require("./configs/navigationGroups");
const timestampsProperties = require("./configs/timestampsProperties");

module.exports = {
    resource: Category,
    options: {
        ...defaultOptions,
        navigation: PARTNER_GROUP,
        properties: {
            ...timestampsProperties,
            _id: {
                isVisible: {
                    list: false,
                    show: true
                }
            },
            description: {
                type: "textarea",
            },
            searchKeys: {
                isVisible: {
                    list: false,
                    show: true,
                    edit: true,
                    new: true,
                    filter: true
                }
            }
        },
        actions: {
            new: { isAccessible: hasPermission(CATEGORY, "canCreate") },
            edit: { isAccessible: hasPermission(CATEGORY, "canModify") },
            delete: { isAccessible: hasPermission(CATEGORY, "canDelete") },
            bulkDelete: { isAccessible: hasPermission(CATEGORY, "canDelete") },
            show: {
                isAccessible: hasPermission(CATEGORY, "canView"),
                showInDrawer: true
            },
            list: { isAccessible: hasPermission(CATEGORY, "canView") },
        }
    }
}