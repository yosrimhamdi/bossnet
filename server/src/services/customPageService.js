const CustomPage = require("../models/CustomPage");

const getCustomPageById = async (id) => {
  const page = await CustomPage.findById(id);

  return page;
};

const getFooterCustomPages = async () => {
  const pages = await CustomPage.find({
    showAtFooter: true,
  })
    .select(["_id", "title"])
    .limit(10);

  return pages;
};

module.exports = {
  getCustomPageById,
  getFooterCustomPages,
};
