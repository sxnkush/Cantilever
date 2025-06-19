const express = require("express")
const {handleTask, provideTask, deleteTask, updateTask, updateToggleCheck} = require("../controllers/task")
const router = express.Router()

router.get("/", provideTask)
router.post("/", handleTask)
router.delete("/:id", deleteTask)
router.patch("/:id", updateTask)
router.patch("/toggle/:id", updateToggleCheck)

module.exports = router 