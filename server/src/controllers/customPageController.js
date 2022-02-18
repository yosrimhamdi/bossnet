const customPageService = require("../services/customPageService");

/*
   params: [customPageId]
*/
const getCustomPageById = async (req, res) => {
  const page = await customPageService.getCustomPageById(
    req.params.customPageId
  );
  res.send({
    page,
  });
};

module.exports = {
  getCustomPageById,
};
