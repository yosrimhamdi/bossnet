const AdminRole = require("../../models/AdminRole");
const { ADMIN_ROLE } = require("../../models/configs/collectionsNames");
const {
  ADMIN_PERMISSION_COLLECTION_CHOICES,
} = require("../../models/configs/enums");
const hasPermission = require("../hasPermission");
const defaultOptions = require("./configs/defaultOptions");
const { ADMIN_GROUP } = require("./configs/navigationGroups");
const timestampsProperties = require("./configs/timestampsProperties");

module.exports = {
  resource: AdminRole,
  options: {
    ...defaultOptions,
    navigation: ADMIN_GROUP,
    properties: {
      ...timestampsProperties,
      _id: {
        isVisible: {
          list: false,
          show: true,
        },
      },
      permissions: {
        isVisible: {
          list: false,
          show: true,
          edit: true,
        },
      },
      "permissions.collection": {
        availableValues: ADMIN_PERMISSION_COLLECTION_CHOICES,
      },
    },
    actions: {
      new: { isAccessible: hasPermission(ADMIN_ROLE, "canCreate") },
      edit: { isAccessible: hasPermission(ADMIN_ROLE, "canModify") },
      delete: { isAccessible: hasPermission(ADMIN_ROLE, "canDelete") },
      bulkDelete: { isAccessible: hasPermission(ADMIN_ROLE, "canDelete") },
      show: {
        isAccessible: hasPermission(ADMIN_ROLE, "canView"),
        showInDrawer: true,
      },
      list: { isAccessible: hasPermission(ADMIN_ROLE, "canView") },
    },
  },
};
