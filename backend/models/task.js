const mongoose = require("mongoose");
const taskSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: false,
    },
    taskInfo: {
      type: String,
      required: true,
    },
    toggleCheck: {
      type: Boolean,
      required: true,
      unique: false,
      default: false,
    },
    starMarked: {
      type: Boolean,
      required: true,
      default: false,
    },
    visitHistory: [{ timestamps: { type: Number } }],
  },
  {
    timestamps: true,
  }
);

const taskModel = mongoose.model("task", taskSchema);
module.exports = taskModel;
