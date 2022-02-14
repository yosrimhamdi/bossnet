const SiteSettings = require("../../models/SiteSettings");
const UploadProvider = require("./features/uploadProvider");
const { default: uploadFileFeature } = require("@admin-bro/upload");
const hasPermission = require("../hasPermission");
const { SITE_SETTINGS } = require("../../models/configs/collectionsNames");
const { ADMIN_GROUP } = require("./configs/navigationGroups");
const imagesValidation = require("./configs/imagesValidation");
module.exports = {
  resource: SiteSettings,
  options: {
    navigation: ADMIN_GROUP,
    listProperties: [
      "email",
      "timing",
      "homePageCardImageUpload",
      "homePageCard.title",
    ],
    properties: {
      _id: {
        isVisible: false,
      },
      homePageCardImage: {
        isVisible: {
          list: false,
          filter: false,
          show: true,
          edit: false,
        },
      },
      "homePageCard.description": {
        type: "textarea",
      },
      homePageCardImageUpload: {
        isVisible: {
          list: true,
          filter: false,
          show: true,
          edit: true,
        },
        isRequired: true,
      },
    },
    actions: {
      new: { isAccessible: false },
      edit: {
        isAccessible: hasPermission(SITE_SETTINGS, "canModify"),
      },
      delete: { isAccessible: false },
      bulkDelete: { isAccessible: false },
      search: { isAccessible: false },
      show: {
        isAccessible: hasPermission(SITE_SETTINGS, "canView"),
        showInDrawer: true,
      },
      list: { isAccessible: hasPermission(SITE_SETTINGS, "canView") },
    },
  },
  features: [
    uploadFileFeature({
      provider: new UploadProvider("home-page"),
      properties: {
        file: "homePageCardImageUpload",
        filePath: "homePageCardImage.filePath",
        filesToDelete: "homePageCardImage.toDelete",
        key: "homePageCardImage.path",
        mimeType: "homePageCardImage.mimeType",
        bucket: "homePageCardImage.bucket",
        size: "homePageCardImage.size",
      },
      validation: imagesValidation,
    }),
  ],
};
