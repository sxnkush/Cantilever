const { getUser } = require("../services/auth");

function restrictToLoggedInUserOnly(req, res, next) {
  console.log("Authenticating....LOGGEDIN");

  const token = req.cookies?.uid;
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    const user = getUser(token);
    if (!user) {
      return res.status(401).json({ message: "unauthorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: "unauthorized" });
  }
}

function checkAuth(req, res, next) {
  console.log("Authenticating....CHECKAUTH");

  const token = req.cookies?.uid;
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const user = getUser(token);
    req.user = user || null;
  } catch (err) {
    console.error("JWT checkAuth error:", err.message);
    req.user = null;
  }

  next();
}

module.exports = {
  restrictToLoggedInUserOnly,
  checkAuth,
};
