const { getUser } = require("../services/auth")

async function restrictToLoggedInUserOnly(req, res, next)
{
    const userId = req.cookies?.uid
    if(!userId) return res.redirect("/login")       //if user is not loggedIn

    const user = getUser(userId)
    if(!user) return res.redirect("/login")

    req.user = user
    next()
}

async function checkAuth(req, res, next)
{
    const userId = req.cookies?.uid
    const user = getUser(userId)

    req.user = user
    next()
}

module.exports = {
    restrictToLoggedInUserOnly,
    checkAuth
}