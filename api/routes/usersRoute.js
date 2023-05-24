const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, mail, password } = req.body;
    // Check if the mail is already in use
    let user = await userModel.findOne({ mail });
    if (user) return res.status(400).json({ error:'Email already in use' });

    // Create the new user
    const newUser = new userModel({
      username, 
      mail,
      password: await bcrypt.hash(password, 10), // Hash the password before saving it to the database to increase security
      role: 'user'
    });
    // Save the new user to the database
    await newUser.save();
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
    if (!user) return res.status(401).json({ error: 'Email not found' }) 

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch)  return res.status(401).json({ error: 'Invalid email or password' }) 

    // Generate a JWT with the user's ID and role
    const payload = { userId: user._id, role: user.role }; 
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }); // Sign the JWT for 1 days

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
    res.cookie('token', '', { maxAge: 0 }); // Clear the cookie
    res.status(200).json();
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
  
    user.lastActive = new Date(); // Update the user's data
    await user.save(); // Save the updated user to the database

    res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// allow users to update their avatar
router.patch('/avatar', async (req, res) => { // "put" if you want to update the whole user, "patch" if you want to update only some fields
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    // Verify the JWT and extract the user's ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Find the user in the database
    const user = await userModel.findById(userId).select('-password'); // Exclude the password from the returned data
    if (!user) return res.status(401).json({error:'Unauthorized'});

    const authClient = await auth.getClient({
      keyFile: 'path/to/keyfile.json',
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
    const drive = google.drive({
      version: 'v3',
      auth: authClient,
    });
    const fileMetadata = {
      name: `avatar_${user._id}.jpg`, // The name of the uploaded file
      parents: ['13opEZj6K6Vyc5CNKtCtJf2HCbagZpm_i'], // The ID of the folder the file should be uploaded to
    };
    const media = {
      mimeType: 'image/jpeg',
      body: fs.createReadStream(`path/to/avatar_${user._id}.jpg`),
    };
    const res = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });
    console.log(`Image uploaded: ${res.data.id}`);

    user.avatar = req.body.avatar || '';    // Update the user's data
    await user.save(); // Save the updated user to the database
    res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router; 