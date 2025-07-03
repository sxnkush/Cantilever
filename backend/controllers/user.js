const User = require("../models/user");
const { setUser } = require("../services/auth");

async function handleSignUp(req, res) {
  console.log("Controller signup");
  const userData = req.body;
  console.log("Data", req.body);
  await User.create({
    name: userData.name,
    email: userData.email,
    password: userData.password,
  });

  return res.status(201).json({ message: "success" });
}

async function handleLogIn(req, res) {
  console.log("Controller LOGIN");
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.json({ message: "not found" });

  const token = setUser(user);
  res.cookie("uid", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: (60 * 60 * 1000) / 6,
  });

  return res.json({ message: "success" });
}

async function handleLogOut(req, res) {
  console.log("Logging out...");
  res.clearCookie("uid", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  return res.json({ message: "Logged Out" });
}

async function provideUser(req, res) {
  if (req.user && req.user._id) {
    userId = req.user._id;
    const userData = await User.find({ _id: userId });
    return res.json(userData);
  }
  else{
    return res.json({message:"not found"})
  }
}

module.exports = { handleSignUp, handleLogIn, handleLogOut, provideUser };
