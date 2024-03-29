const Client = require("../models/Client");
const jwtAuth = require("../utils/jwtAuth");

// provide authentication and client data if is isAuthenticated to request
module.exports = async (req, res, next) => {
  req.isAuthenticated = false;
  const authToken = req.headers.authorization;

  if (authToken && authToken.startsWith("Bearer ")) {
    try {
      const client = await Client.findOne({
        _id: jwtAuth.getClientIdFromJwt(authToken),
        isVerified: true,
      })
        .select([
          "-encryptedPassword",
          "-__v",
          "-ancestors",
          "-isVerified",
          "-isPaid",
        ])
        .populate({
          path: "parent",
          select: ["profile", "_id", "ancestors"],
        });
      if (client) {
        req.client = client;
        req.isAuthenticated = true;
      }
    } catch {
      // skiped errors like (JwtExpired, ...)
    }
  }
  next();
};
