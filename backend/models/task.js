const mongoose = require("mongoose")
const taskSchema = mongoose.Schema(
    {
        taskInfo:{
            type:String,
            required:true,
            unique:true
        },
        toggleCheck:{
            type:Boolean,
            required:true,
            unique: false
        },
        visitHistory: [{timestamps: {type: Number}}]
    }
)


const taskModel = mongoose.model("task", taskSchema)
module.exports = taskModel