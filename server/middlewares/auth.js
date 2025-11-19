const { getUser } = require("../service/auth");

const requireAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }

  const user = getUser(token);

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  req.user = user;
  next();
};

module.exports = requireAuth;
