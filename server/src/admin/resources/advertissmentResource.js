const { default: uploadFileFeature } = require("@admin-bro/upload");
const Advertissment = require("../../models/Advertissment");
const { ADVERTISSMENT } = require("../../models/configs/collectionsNames");
const hasPermission = require("../hasPermission");
const UploadProvider = require("./features/uploadProvider");
const { AD_POSITION_CHOICES } = require("../../models/configs/enums");
const { PUBLIC_GROUP } = require("./configs/navigationGroups");
const timestampsProperties = require("./configs/timestampsProperties");
const defaultOptions = require("./configs/defaultOptions");
const imagesValidation = require("./configs/imagesValidation");

module.exports = {
    resource: Advertissment,
    options: {
        ...defaultOptions,
        navigation: PUBLIC_GROUP,
        properties: {
            ...timestampsProperties,
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
                },
                isRequired: true
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
        },
        actions: {
            new: { isAccessible: hasPermission(ADVERTISSMENT, "canCreate") },
            edit: { isAccessible: hasPermission(ADVERTISSMENT, "canModify") },
            delete: { isAccessible: hasPermission(ADVERTISSMENT, "canDelete") },
            bulkDelete: { isAccessible: hasPermission(ADVERTISSMENT, "canDelete") },
            show: {
                isAccessible: hasPermission(ADVERTISSMENT, "canView"),
                showInDrawer: true
            },
            list: { isAccessible: hasPermission(ADVERTISSMENT, "canView") },
        }
    },
    features: [uploadFileFeature({
        provider: new UploadProvider("advertissments"),
        properties: {
            file: "adImage",
            filePath: "image.filePath",
            filesToDelete: "image.toDelete",
            key: "image.path",
            mimeType: "image.mimeType",
            bucket: "image.bucket",
            size: "image.size",
        },
        validation: imagesValidation
    })]
}