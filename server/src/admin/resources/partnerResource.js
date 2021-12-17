const { default: uploadFileFeature } = require("@admin-bro/upload");
const { default: adminBro } = require("admin-bro");
const { PARTNER } = require("../../models/configs/collectionsNames");
const { PARTNER_TYPE_CHOICES } = require("../../models/configs/enums");
const Partner = require("../../models/Partner");
const hasPermission = require("../hasPermission");
const defaultOptions = require("./configs/defaultOptions");
const { PARTNER_GROUP } = require("./configs/navigationGroups");
const timestampsProperties = require("./configs/timestampsProperties");
const UploadProvider = require("./features/uploadProvider");

module.exports = {
    resource: Partner,
    options: {
        ...defaultOptions,
        navigation: PARTNER_GROUP,
        listProperties: [
            "name",
            "uploadLogo",
            "type",
            "description",
            "createdAt"
        ],
        properties: {
            ...timestampsProperties,
            _id: {
                isVisible: {
                    list: false,
                    show: true
                }
            },
            name: {
                isTitle: true
            },
            logo: {
                isVisible: false
            },
            images: {
                isVisible: false
            },
            uploadLogo: {
                isVisible: {
                    list: true,
                    filter: false,
                    show: true,
                    edit: true
                },
                isRequired: true
            },
            uploadImages: {
                isVisible: {
                    list: true,
                    filter: false,
                    show: true,
                    edit: true
                },
            },
            description: {
                type: "textarea",
            },
            type: {
                availableValues: PARTNER_TYPE_CHOICES
            },
            "location.embedMapIframe": {
                components: {
                    show: adminBro.bundle('./components/locationEmbedMap.jsx')
                }
            }
        },
        actions: {
            new: {
                isAccessible: hasPermission(PARTNER, "canCreate")
            },
            edit: {
                isAccessible: hasPermission(PARTNER, "canModify")
            },
            delete: { isAccessible: hasPermission(PARTNER, "canDelete") },
            show: { isAccessible: hasPermission(PARTNER, "canView") },
            list: { isAccessible: hasPermission(PARTNER, "canView") },
        }
    },
    features: [
        uploadFileFeature({
            provider: new UploadProvider("partners/logo"),
            properties: {
                file: "uploadLogo",
                filePath: "logo.filePath",
                filesToDelete: "logo.toDelete",
                key: "logo.path",
                mimeType: "logo.mimeType",
                bucket: "logo.bucket",
                size: "logo.size",
            },
            validation: {
                mimeTypes: ["image/jpeg", "image/png"]
            }
        }),
        uploadFileFeature({
            provider: new UploadProvider("partners/images"),
            properties: {
                file: "uploadImages",
                filePath: "images.filePath",
                filesToDelete: "images.toDelete",
                key: "images.paths",
                mimeType: "images.mimeTypes",
                bucket: "images.buckets",
                size: "images.size",
            },
            multiple: true,
            validation: {
                mimeTypes: ["image/jpeg", "image/png"]
            }
        })
    ]
}