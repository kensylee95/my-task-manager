// backend/controllers/taskController.js
const Task = require('../models/Task');
// Fetch all tasks for the logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { user_id: req.user.user_id } }); // Fetch tasks for the logged-in user
    res.json({ success: true, tasks });
  } catch (error) {
    console.error('Get Tasks error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { user_id, title, description, deadline, priority } = req.body;

    // Validate required fields
    if (!user_id || !title || !deadline || !priority) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    // Create the task
    const task = await Task.create({
      user_id,
      title,
      description,
      deadline,
      priority,
    });

    res.status(201).json({ success: true, message: 'Task created successfully!', task });
  } catch (error) {
    console.error('Create Task error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
// Update an existing task
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id; // Task ID from URL
    const { title, description, deadline, priority } = req.body;

    // Find the task by ID and user_id
    const task = await Task.findOne({ where: { id: taskId, user_id: req.user.user_id } });

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }

    // Update the task fields
    task.title = title || task.title;
    task.description = description || task.description;
    task.deadline = deadline || task.deadline;
    task.priority = priority || task.priority;

    await task.save(); // Save changes
    res.status(200).json({ success: true, message: 'Task updated successfully!', task });
  } catch (error) {
    console.error('Update Task error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id; // Task ID from URL

    // Find the task by ID and user_id
    const task = await Task.findOne({ where: { id: taskId, user_id: req.user.user_id } });

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }

    await task.destroy(); // Delete the task
    res.status(200).json({ success: true, message: 'Task deleted successfully!' });
  } catch (error) {
    console.error('Delete Task error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};