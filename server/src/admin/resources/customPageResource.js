const CustomPage = require("../../models/CustomPage");
const hasPermission = require("../hasPermission");
const { CUSTOM_PAGE } = require("../../models/configs/collectionsNames");
const { PUBLIC_GROUP } = require("./configs/navigationGroups");
const { default: adminBro } = require("admin-bro");
const timestampsPropertyConfigs = require("./timestampsPropertyConfigs");

module.exports = {
    resource: CustomPage,
    options: {
        navigation: PUBLIC_GROUP,
        properties: {
            ...timestampsPropertyConfigs,
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
            description: {
                type: "textarea",
            },
            pageUrl: {
                isVisible: {
                    list: false,
                    show: true
                },
                components: {
                    show: adminBro.bundle('./components/pageUrl.jsx')
                }
            }
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