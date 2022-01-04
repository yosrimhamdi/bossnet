// Make requests slower for better testing in front-end
// used for dev mode only
module.exports = async (req, res, next) => {
  // console.log({ auth: req.headers, body: req.body });
  setTimeout(() => next(), 300);
};
