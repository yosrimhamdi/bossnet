const ClientPayment = require("../../models/ClientPayment");
const { CLIENT_PAYMENT } = require("../../models/configs/collectionsNames");
const { CLIENT_PAYMENT_METHOD_CHOICES } = require("../../models/configs/enums");
const hasPermission = require("../hasPermission");
const defaultOptions = require("./configs/defaultOptions");
const { CLIENT_GROUP } = require("./configs/navigationGroups");
const timestampsProperties = require("./configs/timestampsProperties");


module.exports = {
    resource: ClientPayment,
    options: {
        ...defaultOptions,
        navigation: CLIENT_GROUP,
        listProperties: [
            "client",
            "amount",
            "paymentMethod",
            "isPaid",
            "createdAt"
        ],
        properties: {
            ...timestampsProperties,
            _id: {
                isVisible: {
                    list: false,
                    show: true,
                    filter: true
                }
            },
            paymentMethod: {
                availableValues: CLIENT_PAYMENT_METHOD_CHOICES
            },
        },
        actions: {
            new: { isAccessible: hasPermission(CLIENT_PAYMENT, "canCreate") },
            edit: { isAccessible: hasPermission(CLIENT_PAYMENT, "canModify") },
            delete: { isAccessible: hasPermission(CLIENT_PAYMENT, "canDelete") },
            show: {
                isAccessible: hasPermission(CLIENT_PAYMENT, "canView"),
                showInDrawer: true
            },
            list: { isAccessible: hasPermission(CLIENT_PAYMENT, "canView") },
        }
    }
}