const express = require("express")
const {handleSignUp, handleLogIn, handleLogOut, provideUser} = require("../controllers/user")
const router = express.Router()

router.post("/signup", handleSignUp)
router.post("/login", handleLogIn)
router.post("/logout", handleLogOut)
router.get("/", provideUser)

module.exports = router;