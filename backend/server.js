const express = require('express');
const cors = require('cors');
const validateTask = require('./middleware/validateTask');

const app = express();
const PORT = 4000;

let tasks = [];
let nextId = 1;

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'], 
  allowedHeaders: ['Content-Type'], 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

app.get('/api/tasks', (req, res) => {
  try {
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "error: couldn't get all tasks", error: error });
  }
});

app.post('/api/tasks', validateTask, (req, res) => {
  try {
  const data = req.body;
  const exist = tasks.find(task => task.id === data.id);
  if (exist) {
    return res.status(400).json({ message: "error: task already exists" });
  }
  const newTask = { 
    id: data.id,
    title: data.title,
    description: data.description,
    completed: data.completed, 
    createdAt: new Date().toISOString(), 
    priority: data.priority,
    dueDate: data.dueDate || null
   };
  tasks.push(newTask);
  res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "error: couldn't create task", error: error });
  }
});

app.put('/api/tasks', validateTask, (req, res) => {
  try {
    const data = req.body;
    if (!data.id) {
      return res.status(400).json({ message: "error: id is required in request body" });
    }
    const index = tasks.findIndex(task => task.id === parseInt(data.id));
    
    if (index === -1) {
      return res.status(404).json({ message: "error: task not found" });
    }
    
    const task = tasks[index];
    const updatedTask = {
      id: task.id,
      title: data.title,
      description: data.description,
      completed: data.completed,
      createdAt: task.createdAt,
      priority: data.priority,
      dueDate: data.dueDate || null
    };
    tasks[index] = updatedTask;
    res.status(200).json(updatedTask);
  }
  catch (error) {
    res.status(500).json({ message: "error: couldn't update task", error: error });
  }
});

app.delete('/api/tasks', (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "error: id is required in request body" });
    }
    const index = tasks.findIndex(task => task.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ message: "error: task not found" });
    }
    tasks.splice(index, 1);
    res.status(200).json({ message: "task deleted successfully" });
  }
  catch (error) {
    res.status(500).json({ message: "error: couldn't delete task", error: error });
  }
});

app.patch('/api/tasks', (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "error: id is required in request body" });
    }
    const index = tasks.findIndex(task => task.id === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ message: "error: task not found" });
    }
    tasks[index].completed = !tasks[index].completed;
    res.status(200).json({ message: "task status updated successfully" });
  }
  catch (error) { 
    res.status(500).json({ message: "error: couldn't update task status", error: error });
  }
});

app.post('/api/tasks/sync_tasks', (req, res) => {
  try {
    const data = req.body;
    if (!Array.isArray(data.tasks)) {
      return res.status(400).json({ message: "error: tasks must be an array" });
    }
    tasks = data.tasks;
    if (data.nextId) {
      nextId = data.nextId;
    }
    console.log(`Synced ${tasks.length} tasks from frontend`);
    res.status(200).json({ message: "tasks synced successfully", count: tasks.length });
  }
  catch (error) {
    res.status(500).json({ message: "error: couldn't sync tasks", error: error });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
