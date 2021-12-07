const { default: uploadFileFeature } = require("@admin-bro/upload");
const Advertissment = require("../../models/Advertissment");
const { ADVERTISSMENT } = require("../../models/configs/collectionsNames");
const hasPermission = require("../hasPermission");
const UploadProvider = require("./features/uploadProvider");
const { AD_POSITION_CHOICES } = require("../../models/configs/enums");
const { PUBLIC_GROUP } = require("./configs/navigationGroups");

module.exports = {
    resource: Advertissment,
    options: {
        navigation: PUBLIC_GROUP,
        properties: {
            image: {
                isVisible: {
                    list: false,
                    filter: false,
                    show: true,
                    edit: false
                },
            },
            adImage: {
                isVisible: {
                    list: true,
                    filter: false,
                    show: true,
                    edit: true
                }
            },
            duration: {
                isVisible: {
                    list: false,
                    show: true,
                    edit: true
                }
            },
            position: {
                availableValues: AD_POSITION_CHOICES
            },
            _id: {
                isVisible: {
                    list: false,
                    show: true
                }
            },
            url: {
                type: "url"
            },
            description: {
                isVisible: {
                    list: false,
                    filter: false,
                    show: true,
                    edit: true
                },
            }
        },
        actions: {
            new: { isAccessible: hasPermission(ADVERTISSMENT, "canCreate") },
            edit: { isAccessible: hasPermission(ADVERTISSMENT, "canModify") },
            delete: { isAccessible: hasPermission(ADVERTISSMENT, "canDelete") },
            show: { isAccessible: hasPermission(ADVERTISSMENT, "canView") },
            list: { isAccessible: hasPermission(ADVERTISSMENT, "canView") },
        }
    },
    features: [uploadFileFeature({
        provider: new UploadProvider("advertissments"),
        properties: {
            key: "image.path",
            mimeType: "image.mimeType",
            file: "adImage"
        },
    })]
}