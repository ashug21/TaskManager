const Task = require('../models/Task');

const getTotalTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    if (!tasks || tasks.length === 0) {
      return res.json({ success: false, message: "No tasks found" });
    }

    const total = tasks.length;
    const completed = tasks.filter(task => task.status === true).length;
    const pending = total - completed;

    res.json({success: true,total,completed,pending,});
    
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

module.exports = { getTotalTasks };
