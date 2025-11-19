const jwt = require("jsonwebtoken");
const secret = "SuPeRmAnBaTmAn1256";

const setUser = (user) => {
  const payload = {
    id: user._id,
    email: user.email
  };

  return jwt.sign(payload, secret, { expiresIn: 100 });
};

const getUser = (token) => {
  if (!token) return null;

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log("JWT error:", error);
    return null;
  }
};

module.exports = { setUser, getUser };
