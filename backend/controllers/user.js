const User = require("../models/user")
const {setUser} = require("../services/auth")

async function handleSignUp(req,res)
{
    const userData = req.body
    await User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password
    })

    return res.redirect("/login")
}

async function handleLogIn(req,res)
{
    const {email, password} = req.body
    const user = await User.findOne({email, password})
    if(!user) return res.redirect("/login")

    const token = setUser(user) 
    res.cookie('uid', token)
    return res.redirect("/")   
}

module.exports = {handleSignUp, handleLogIn}