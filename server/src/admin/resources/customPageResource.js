const CustomPage = require("../../models/CustomPage");
const hasPermission = require("../hasPermission");
const { CUSTOM_PAGE } = require("../../models/configs/collectionsNames");
const { PUBLIC_GROUP } = require("./configs/navigationGroups");

module.exports = {
    resource: CustomPage,

    options: {
        navigation: PUBLIC_GROUP,
        properties: {
            _id: {
                isVisible: {
                    list: false,
                    show: true,
                    filter: true
                }
            },
            content: {
                type: 'richtext',
                isVisible: {
                    list: false,
                    show: true,
                    edit: true
                }
            },

        },
        actions: {
            new: { isAccessible: hasPermission(CUSTOM_PAGE, "canCreate") },
            edit: { isAccessible: hasPermission(CUSTOM_PAGE, "canModify") },
            delete: { isAccessible: hasPermission(CUSTOM_PAGE, "canDelete") },
            show: { isAccessible: hasPermission(CUSTOM_PAGE, "canView") },
            list: { isAccessible: hasPermission(CUSTOM_PAGE, "canView") },
        }
    }
}