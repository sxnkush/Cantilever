const taskModel = require("../models/task");

async function handleTask(req, res) {
  const taskData = req.body;
  if (!taskData.taskInfo) return res.status(400).json({ msg: "NO task found" });
  console.log("Handle");
  await taskModel.create({
    userId: req.user._id, //will get 'user' from the middleware restrictedtologgedinusers there we defined req.user = user using the route '/task'
    taskInfo: taskData.taskInfo,
    toggleCheck: taskData.toggleCheck,
    startMarked: taskData.startMarked,
    visitHistory: [],
  });

  const updatedTaskData = await taskModel.find();
  return res.json(updatedTaskData);
}

async function provideTask(req, res) {
  if (!req.user || !req.user._id) {
    return res.json({ message: "not found" });
  }
  const userId = req.user._id;
  const taskData = await taskModel.find({ userId: userId });
  if (!taskData) {
    return res.json({ message: "not found" });
  }
  return res.json(taskData);
}

async function deleteTask(req, res) {
  const id = req.params.id;
  try {
    const deleteData = await taskModel.findByIdAndDelete(id);
    if (!deleteData) return res.status(400).json({ msg: "No such task" });
    else return res.json({ msg: "success", deleted: deleteData });
  } catch (err) {
    return res.json({ Error: err });
  }
}

async function updateTask(req, res) {
  console.log("Update");
  const id = req.params.id;
  const taskData = req.body;
  try {
    const updateData = await taskModel.findByIdAndUpdate(
      id,
      { taskInfo: taskData.taskInfo },
      { new: true }
    );
    const updatedTaskData = await taskModel.find();
    return res.json(updatedTaskData);
  } catch (error) {
    return res.status(400).json({ msg: "Error in updating task" });
  }
}

async function updateToggleCheck(req, res) {
  const id = req.params.id;
  const taskData = req.body;

  try {
    const updateToggle = await taskModel.findByIdAndUpdate(
      id,
      { toggleCheck: !taskData.toggleCheck },
      { new: true }
    );
    const updatedTaskData = await taskModel.find();
    return res.json(updatedTaskData);
  } catch (error) {
    return res.status(400).json({ msg: "Error in updating toggle" });
  }
}

async function updateStarMark(req, res) {
  const id = req.params.id;
  const taskData = req.body;

  try {
    const updateStarMark = await taskModel.findByIdAndUpdate(id, {
      starMarked: !taskData.starMarked,
    });
    const updatedStarData = await taskModel.find();
    return res.json(updatedStarData);
  } catch (err) {
    return res.status(400).json({ msg: "Error in updating star" });
  }
}

module.exports = {
  handleTask,
  provideTask,
  deleteTask,
  updateTask,
  updateToggleCheck,
  updateStarMark,
};
