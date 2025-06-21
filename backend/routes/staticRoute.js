const express = require("express")
const router = express.Router()

router.get("/", async(req, res) => {
    if(!req.user) return res.redirect('/login')
    return res.redirect("/")
})


module.exports = router 