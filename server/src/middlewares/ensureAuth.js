module.exports = async (req, res, next) => {
  if (req.isAuthenticated) {
    next();
    return;
  }
  res.status(401).send({
    error: "UNAUTHORIZED_AUTH_ERROR",
  });
};
