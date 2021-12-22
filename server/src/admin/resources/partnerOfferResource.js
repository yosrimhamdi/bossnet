const { default: uploadFileFeature } = require("@admin-bro/upload");
const { PARTNER_OFFER } = require("../../models/configs/collectionsNames");
const PartnerOffer = require("../../models/PartnerOffer");
const hasPermission = require("../hasPermission");
const defaultOptions = require("./configs/defaultOptions");
const imagesValidation = require("./configs/imagesValidation");
const { PARTNER_GROUP } = require("./configs/navigationGroups");
const timestampsProperties = require("./configs/timestampsProperties");
const UploadProvider = require("./features/uploadProvider");

module.exports = {
    resource: PartnerOffer,
    options: {
        ...defaultOptions,
        navigation: PARTNER_GROUP,
        listProperties: [
            "title",
            "partner",
            "uploadImage",
            "duration",
            "createdAt"
        ],
        properties: {
            ...timestampsProperties,
            image: {
                isVisible: false
            },
            uploadImage: {
                isVisible: {
                    list: true,
                    filter: false,
                    show: true,
                    edit: true
                },
                isRequired: true
            },
            description: {
                type: "textarea",
            },
        },
        actions: {
            new: { isAccessible: hasPermission(PARTNER_OFFER, "canCreate") },
            edit: {
                isAccessible: hasPermission(PARTNER_OFFER, "canModify"),
            },
            delete: { isAccessible: hasPermission(PARTNER_OFFER, "canDelete") },
            bulkDelete: { isAccessible: hasPermission(PARTNER_OFFER, "canDelete") },
            show: {
                isAccessible: hasPermission(PARTNER_OFFER, "canView"),
                showInDrawer: true
            },
            list: { isAccessible: hasPermission(PARTNER_OFFER, "canView") },
        }
    },
    features: [
        uploadFileFeature({
            provider: new UploadProvider("partners/offers"),
            properties: {
                file: "uploadImage",
                filePath: "image.filePath",
                filesToDelete: "image.toDelete",
                key: "image.path",
                mimeType: "image.mimeType",
                bucket: "image.bucket",
                size: "image.size",
            },
            validation: imagesValidation
        })
    ]
}