const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
console.log(__dirname);
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from the frontend URL


// MongoDB Task model
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Task = mongoose.model('Task', TaskSchema);

// POST /task route to handle incoming task data
app.post('/task', async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create new task
    const newTask = new Task({
      title,
      description,
    });

    // Save task to MongoDB
    await newTask.save();

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve the React app
app.get('/', (req, res) => {
  res.send("helllo");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} ${__dirname}`));

// MongoDB connection
mongoose
  .connect('mongodb://mongo:27017/todoapp') // Use 'mongo' service name from docker-compose
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));
