const jwt = require("jsonwebtoken");
const key = "Passthekey0";

function setUser(user) {
  try {
    return jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },
      key
    );
  } catch (error) {
    return error;
  }
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, key);
}

module.exports = {setUser, getUser}