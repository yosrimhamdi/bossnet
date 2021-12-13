const Client = require("../../../models/Client");
const { CLIENT } = require("../../../models/configs/collectionsNames");
const { CLIENT_GROUP } = require("../configs/navigationGroups");
const timestampsProperties = require("../configs/timestampsProperties");
const hasPermission = require("../../hasPermission");
const {
    handleBeforeSaveAction,
    handleAfterSaveAction
} = require("./actions");
const { CLIENT_CHILD_DIRECTION_CHOICES, CLIENT_PROFILE_GENDER_CHOICES } = require("../../../models/configs/enums");
const { default: adminBro } = require("admin-bro");
const defaultOptions = require("../configs/defaultOptions");

module.exports = {
    resource: Client,
    options: {
        ...defaultOptions,
        navigation: CLIENT_GROUP,
        editProperties: [
            "profile",
            "cinId",
            "rib",
            "email",
            "password",
            "parent",
            "direction",
            "isVerified",
            "isPaid"
        ],
        listProperties: [
            "email",
            "fullName",
            "parent",
            "createdAt"
        ],
        properties: {
            ...timestampsProperties,
            encryptedPassword: { isVisible: false, isRequired: false },
            password: {
                type: "password",
                isRequired: {
                    new: true
                },
                isVisible: {
                    list: false,
                    edit: true,
                    filter: false,
                    show: false,
                },
            },

            fullName: {
                isTitle: true,
                isVisible: {
                    list: true,
                    show: false
                },
                components: {
                    list: adminBro.bundle('./../components/clientFullName.jsx')
                }
            },
            direction: {
                availableValues: CLIENT_CHILD_DIRECTION_CHOICES
            },
            "profile.gender": {
                availableValues: CLIENT_PROFILE_GENDER_CHOICES
            },
        },
        actions: {
            new: {
                before: handleBeforeSaveAction,
                after: handleAfterSaveAction,
                isAccessible: hasPermission(CLIENT, "canCreate")
            },
            edit: {
                before: handleBeforeSaveAction,
                after: handleAfterSaveAction,
                isAccessible: hasPermission(CLIENT, "canModify")
            },
            delete: { isAccessible: hasPermission(CLIENT, "canDelete") },
            show: {
                isAccessible: hasPermission(CLIENT, "canView"),
                showInDrawer: true
            },
            list: { isAccessible: hasPermission(CLIENT, "canView") },
        },
    }
}