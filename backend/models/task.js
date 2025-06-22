const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique:false
  },
  taskInfo: {
    type: String,
    required: true,
  },
  toggleCheck: {
    type: Boolean,
    required: true,
    unique: false,
  },
  visitHistory: [{ timestamps: { type: Number } }],
});

const taskModel = mongoose.model("task", taskSchema);
module.exports = taskModel;
