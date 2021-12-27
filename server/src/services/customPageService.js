const CustomPage = require("../models/CustomPage");

const getCustomPageById = async (id) => {
  const page = await CustomPage.findById(id);

  return page;
};

module.exports = {
  getCustomPageById,
};
