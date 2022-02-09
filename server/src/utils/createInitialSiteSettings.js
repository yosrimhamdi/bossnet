const SiteSettings = require("../models/SiteSettings");
const consola = require("consola");
const { INIT_SITE_SETTINGS } = require("../config");

// create initial site settings if doesn't exists
module.exports = async () => {
  if (!(await SiteSettings.findOne().count())) {
    try {
      await SiteSettings.create(INIT_SITE_SETTINGS);
      consola.success("Site settings created successfuly");
    } catch (e) {
      consola.error("Site settings creation error");
      console.log(e);
    }
  }
};
