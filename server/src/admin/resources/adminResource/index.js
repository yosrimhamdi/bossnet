const Admin = require("../../../models/Admin");
const { ADMIN } = require("../../../models/configs/collectionsNames");
const bcrypt = require("bcrypt");
const hasPermission = require("../../hasPermission");
const { ADMIN_GROUP } = require("../configs/navigationGroups");
const timestampsProperties = require("../configs/timestampsProperties");
const { handleBeforeSaveAction, handleAfterSaveAction } = require("./actions");
const defaultOptions = require("../configs/defaultOptions");



module.exports = {
    resource: Admin,
    options: {
        ...defaultOptions,
        navigation: ADMIN_GROUP,
        properties: {
            ...timestampsProperties,
            _id: {
                isVisible: {
                    list: false,
                    filter: true,
                    show: true
                },
            },
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
        },
        actions: {
            new: {
                before: handleBeforeSaveAction,
                after: handleAfterSaveAction,
                isAccessible: hasPermission(ADMIN, "canCreate")
            },
            edit: {
                before: handleBeforeSaveAction,
                after: handleAfterSaveAction,
                isAccessible: hasPermission(ADMIN, "canModify")
            },
            delete: { isAccessible: hasPermission(ADMIN, "canDelete") },

            show: {
                isAccessible: hasPermission(ADMIN, "canView"),
                showInDrawer: true
            },
            list: { isAccessible: hasPermission(ADMIN, "canView") },
        },
    }
}