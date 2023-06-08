
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'swathyshaji01';
const app = express();
app.use(cors());
// app.use(express.static('public'));
app.use(express.json());

// Connect to MongoDB database
mongoose.connect('mongodb+srv://Swathy:swathy123@cluster0.4mgqf90.mongodb.net/reactdata?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

// Create a model for users
const User = mongoose.model('User', userSchema);

// Signup route
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Create a new user document
  const newUser = new User({ username, email, password });
  newUser.save()
    .then(user => {
      return res.status(200).json({ message: 'Signup successful' });
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;


  // Find the user with the given username and password
  User.findOne({ username, password })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const token = jwt.sign({ userId: user._id }, jwtSecret);
      return res.status(200).json({ token, name: user.username }); // Include the user's name in the response
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

// Logout route
app.post('/logout', (req, res) => {
  return res.status(200).json({ message: 'Logout successful' });
});

// Get user details route
app.get('/user', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.userId;

    // Find the user with the given user ID
    User.findById(userId)
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // Return the user details
        return res.status(200).json({ user });
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

app.listen(8001, () => {
  console.log('App is running on port 8001');
});
