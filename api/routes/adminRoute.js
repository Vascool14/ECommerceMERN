const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const productModel = require('../models/productModel');
const orderModel = require('../models/orderModel');

const router = express.Router();

// Get everything (only for admins)
router.get('/', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    // Verify the JWT and extract the user's role
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Find the user in the database
    const user = await userModel.findById(userId);
    if (!user || (user.role !== 'admin')) return res.status(401).json({ error: 'Unauthorized' }); // Check if the user is an admin
    else {
      const users = await userModel.find().select('-password');
      const products = await productModel.find();
      const orders = await orderModel.find();
      res.status(200).json({ users, products, orders });
    }
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;