// backend/routes/tasks.js
const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController'); // Import all functions
const verifyToken = require('../middleware/authMiddleware'); // Middleware for authentication
const router = express.Router();
router.use(verifyToken); // Apply authentication middleware to all routes
// POST route to create a task
router.post('/', createTask);
// GET route to fetch tasks
router.get('/', getTasks);
// PUT route to update a specific task
router.put('/:id', updateTask);
// DELETE route to delete a specific task
router.delete('/:id', deleteTask);
module.exports = router;