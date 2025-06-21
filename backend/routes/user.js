const express = require("express")
const {handleSignUp, handleLogIn} = require("../controllers/user")
const router = express.Router()

router.post("/signup", handleSignUp)
router.post("/login", handleLogIn)