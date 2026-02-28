const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

let tasks = [];
let nextId = 1;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

app.get('/api/tasks/get_all_tasks', (req, res) => {
  try {
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "error: couldn't get all tasks", error: error });
  }
});

app.post('/api/tasks/create_task', (req, res) => {
  try {
  const data = req.body;
  const newTask = { 
    id: data.id,
    title: data.title,
    description: data.description,
    completed: data.completed, 
    createdAt: data.createdAt, 
    priority: data.priority
   };
  tasks.push(newTask);
  res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "error: couldn't create task", error: error });
  }
});

app.put('/api/tasks/update_task/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const index = tasks.findIndex(task => task.id === id);
    const task = tasks[index];
    if (index === -1) {
      return res.status(404).json({ message: "error: task not found" });
    }
    const updatedTask = {
      id: data.id,
      title: data.title,
      description: data.description,
      completed: data.completed,
      createdAt: task.createdAt,
      priority: data.priority
    };
    tasks[index] = updatedTask;
    res.status(200).json(updatedTask);
  }
  catch (error) {
    res.status(500).json({ message: "error: couldn't update task", error: error });
  }
});

app.delete('/api/tasks/delete_task/:id', (req, res) => {
  try {
    const { id } = req.params;
    const index = tasks.findIndex(task => task.id === id);
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

app.patch('/api/tasks/update_task_status/:id', (req, res) => {
  try {
    const { id } = req.params;
    const index = tasks.findIndex(task => task.id === id);
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



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
