const Admin = require("../../models/Admin");
const { ADMIN } = require("../../models/configs/collectionsNames");
const bcrypt = require("bcrypt");
const hasPermission = require("../hasPermission");
const { ADMIN_GROUP } = require("./configs/navigationGroups");

const handleBeforeSaveAction = async(req) => {
    if (req.payload.password) {
        req.payload.encryptedPassword = bcrypt.hashSync(req.payload.password, 10);
        delete req.payload.password;
    }
    return req;
}

module.exports = {
    resource: Admin,
    options: {
        navigation: ADMIN_GROUP,
        properties: {
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
                isAccessible: hasPermission(ADMIN, "canCreate")
            },
            edit: {
                before: handleBeforeSaveAction,
                isAccessible: hasPermission(ADMIN, "canModify")
            },
            delete: { isAccessible: hasPermission(ADMIN, "canDelete") },
            show: { isAccessible: hasPermission(ADMIN, "canView") },
            list: { isAccessible: hasPermission(ADMIN, "canView") },
        },
    }
}