const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, mail, password, avatar, wishlist, cart } = req.body;
    // Check if the mail is already in use
    const user = await userModel.findOne({ mail });
    if (user) return res.status(400).json({ error:'Email already in use' });

    // Create the new user
    const newUser = new userModel({
      username, 
      mail,
      password: await bcrypt.hash(password, 10), // Hash the password before saving it to the database to increase security
      avatar, 
      wishlist, 
      cart,
      role: 'user'
    });
    // Save the new user to the database
    await newUser.save();
    // SUCCESS
    res.status(201).json({ message: 'User created successfully' });
  }catch(err){
    // ERROR Handling
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Log in a user
router.post('/login', async (req, res) => {
  try {
    const { mail, password } = req.body;

    // Check if the mail exists in the database
    const user = await userModel.findOne({mail});  
    if (!user) { return res.status(401).json({ error: 'Invalid email or password' }) }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) { return res.status(401).json({ error: 'Invalid email or password' }) }

    // Generate a JWT with the user's ID and role
    const payload = { userId: user._id, role: user.role }; 
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }); // Sign the JWT for 1 days

    // Send the JWT as a cookie for 7 days in milliseconds
    res.cookie('token', token, { httpOnly: true, maxAge: 86400000 });
    // SUCCESS
    res.status(200).json({token});
    }catch(err){
        // ERROR Handling
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Log out a user 
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}); 

// Get the currently logged in user, you might need this when you want to display the user's name in the navbar for example
router.get('/me', async (req, res) => { 
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    // Verify the JWT and extract the user's ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Find the user in the database
    const user = await userModel.findById(userId).select('-password'); // Exclude the password from the returned data
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get the dashboard (only for admins)
router.get('/dashboard', async (req, res) => {
  try {
    const token = req.cookies.token;
    
    // Verify the JWT and extract the user's role
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Find the user in the database
    const user = await userModel.findById(userId);
    if (!user || (user.role !== 'admin')) return res.status(401).json({ error: 'Unauthorized' }); // Check if the user is an admin

    res.status(200).json({ message: 'Hello, admin!' });
    } catch (err) {
        // ERROR Handling
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router; 