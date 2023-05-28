const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// User model and schema definition
const User = require('../models/user');

//CREATE
router.post("/", async (req, res) => {
    console.log(req.body);
    const { name,age, username } = req.body;
    try {
      const userAdded = await User.create({
        username: username,
        password: password
        
      });
      res.status(201).json(userAdded);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  });

  
// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user with the provided username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JSON Web Token (JWT) for authentication
    const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Login failed:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
