const express = require('express');
const router = express.Router();

// Task model and schema definition
const Task = require('../models/task');

// Tasks endpoint - Retrieve all tasks
// router.get('/tasks', async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (err) {
//     console.error('Failed to retrieve tasks:', err);
//     res.status(500).json({ error: 'Failed to retrieve tasks' });
//   }
// });

//GET
router.get("/tasks", async (req, res) => {
    try {
      const allTasks = await Task.find(); 
      res.status(200).json(allTasks);
    } catch (error) {
      console.error('Failed to retrieve tasks:', err);
      res.status(500).json({ error: error.message });
    }
  });

// Tasks endpoint - Create a new task
// router.post('/tasks', async (req, res) => {
//   const { title, description, dueDate } = req.body;

//   try {
//     const task = await Task.create({ title, description, dueDate });
//     res.status(201).json(task);
//   } catch (err) {
//     console.error('Failed to create task:', err);
//     res.status(500).json({ error: 'Failed to create task' });
//   }
// });

//CREATE
router.post("/tasks", async (req, res) => {
    console.log(req.body);
    const { title, description, dueDate } = req.body;
    try {
      const taskAdded = await Task.create({
        title: title,
        description: description,
        dueDate: dueDate,
        
      });
      res.status(201).json(taskAdded);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });

   //UPDATE
router.patch("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    // console.log("get body", req.body);
    // console.log("get id", id);
    const { title, description, dueDate } = req.body;
    try {
      const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

// Tasks endpoint - Update a task
// router.put('/tasks/:id', async (req, res) => {
//   const { id } = req.params;
//   const { title, description, dueDate } = req.body;

//   try {
//     const task = await Task.findByIdAndUpdate(id, { title, description, dueDate }, { new: true });
//     res.json(task);
//   } catch (err) {
//     console.error('Failed to update task:', err);
//     res.status(500).json({ error: 'Failed to update task' });
//   }
// });

// Tasks endpoint - Delete a task
// router.delete('/tasks/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     await Task.findByIdAndDelete(id);
//     res.json({ message: 'Task deleted successfully' });
//   } catch (err) {
//     console.error('Failed to delete task:', err);
//     res.status(500).json({ error: 'Failed to delete task' });
//   }
// });

//DELETE
router.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const deletedTask = await Task.findByIdAndDelete({ _id: id });
      res.status(201).json(deletedTask);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.get("/tasks/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const singleTask = await Task.findById({ _id: id });
      res.status(200).json(singleTask);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
