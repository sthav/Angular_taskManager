const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const port = 3000; // Change as per your preference

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://sthavidhr:sthav@task-manager.8jkq1rj.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB Atlas:', err);
    process.exit(1);
  });

// Define your API routes here
app.use('/api/user', authRoutes);
app.use('/api/task', taskRoutes);


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
