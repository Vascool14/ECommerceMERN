const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const productModel = require('../models/productModel');
const orderModel = require('../models/orderModel');
const newsModel = require('../models/newsModel');
const mongoose = require('mongoose');

const router = express.Router();

// get all ORDERS (only for admins)
router.get('/orders', async (req, res) => {
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
      const orders = await orderModel.find();
      res.status(200).json({ orders });
    }
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// get all Users (only for admins)
router.get('/users', async (req, res) => {
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
      users.forEach((user, index) => { 
        if (user.role === 'admin') users.splice(index, 1);
      });
      res.status(200).json({users});
    }
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// get only one User (only for admins)
router.get('/user', async (req, res) => {
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
      findUser = await userModel.findById(req.query.id).select('-password');
      if (!findUser) return res.status(404).json({ error: 'User not found' });
      res.status(200).json(findUser.lastActive);
    }
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

//POST one product (only for admins)
router.post('/product', async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;
  const user = await userModel.findById(userId);
  if (!user || (user.role !== 'admin')) return res.status(401).json({ error: 'Unauthorized' }); 
  // Check if the user is an admin
  
  //add to db
  const {title, description, images, price, category} = req.body;
  try{
      const product = await productModel.create({title, description, images, price, category});
      res.status(200).json({product});
  }catch(err){
      res.status(400).json({message: err.message});
  }
});

//DELETE one product (only for admins)
router.delete('/product/:id', async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;
  const user = await userModel.findById(userId);
  if (!user || (user.role !== 'admin')) return res.status(401).json({ error: 'Unauthorized' }); 
  // Check if the user is an admin
    
  const { id } = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({message: 'Product not found'}); // check if id is valid
  }
  const product = await productModel.findOneAndDelete({_id: id});
  if(!product) return res.status(404).json({message: 'Product not found'}); // check if product exists
  res.status(200).json({message: 'Product deleted: '+ product.title});
});

// UPDATE one product (only for admins)
router.patch('/product', async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;
  const user = await userModel.findById(userId);
  if (!user || (user.role !== 'admin')) return res.status(401).json({ error: 'Unauthorized' }); 
  // Check if the user is an admin
     
  const {title, description, images, price, _id} = req.body;
  if(!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).json({message: 'Product not found'}); // check if id is valid
  }
  try{ 
    const updatedProduct = await productModel.findByIdAndUpdate(_id, {title, description, images, price}, {new: true});
    res.status(200).json(updatedProduct);
  }catch(err){
    res.status(400).json({message: err.message});
  }
});

//change promo news (only for admins)
router.put('/news', async (req, res) => { 
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;
  const user = await userModel.findById(userId);
  if (!user || (user.role !== 'admin')) return res.status(401).json({ error: 'Unauthorized' }); 
  // Check if the user is an admin

  const news = req.body;
  try{
    await newsModel.deleteMany({});
    await newsModel.create({news});
    res.status(200).json({news});
  }
  catch(err){
    res.status(400).json({message: err.message});
  }    
});

module.exports = router;