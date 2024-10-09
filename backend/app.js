const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '../dist')))
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // To handle CORS issues if React and Express run on different ports

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

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/todo-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));
