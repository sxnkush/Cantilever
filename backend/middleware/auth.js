const { getUser } = require("../services/auth")

async function restrictToLoggedInUserOnly(req, res, next)
{
    console.log("Authenticating....LOGGEDIN")
    const userId = req.cookies?.uid
    if(!userId) return res.json({message:"not found"})       //if user is not loggedIn

    const user = getUser(userId)
    if(!user) return res.json({message:"not found"})

    req.user = user 
    next()
}

async function checkAuth(req, res, next)
{
    console.log("Authenticating....CHECKAUTH")
    const userId = req.cookies?.uid
    const user = getUser(userId)

    req.user = user
    next()
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
}