const SiteSettings = require("../../models/SiteSettings");
const hasPermission = require("../hasPermission");
const { SITE_SETTINGS } = require("../../models/configs/collectionsNames");
const { ADMIN_GROUP } = require("./configs/navigationGroups");
module.exports = {
  resource: SiteSettings,
  options: {
    navigation: ADMIN_GROUP,
    properties: {
      _id: {
        isVisible: false,
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
};
