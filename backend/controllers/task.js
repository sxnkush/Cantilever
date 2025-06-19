const taskModel = require("../models/task");

async function handleTask(req, res) {
  const taskData = req.body;
  if (!taskData.taskInfo) return res.status(400).json({ msg: "NO task found" });

  await taskModel.create({
    taskInfo: taskData.taskInfo,
    toggleCheck: taskData.toggleCheck,
    visitHistory: [],
  });

  const updatedTaskData = await taskModel.find();
  return res.json(updatedTaskData);
}

async function provideTask(req, res) {
  const taskData = await taskModel.find();
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
    return res.status(400).json({ msg: "Error in updating" });
  }
}

async function updateToggleCheck(req,res)
{
    const id = req.params.id
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
    return res.status(400).json({ msg: "Error in updating" });
  }
}

module.exports = { handleTask, provideTask, deleteTask, updateTask, updateToggleCheck };
