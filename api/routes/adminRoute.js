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

//POST one product (only for admins)
router.post('/', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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
router.patch('/:id', async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;
  const user = await userModel.findById(userId);
  if (!user || (user.role !== 'admin')) return res.status(401).json({ error: 'Unauthorized' }); 
  // Check if the user is an admin
    
  const { id } = req.params;
  const {title, description, images, price} = req.body;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({message: 'Product not found'}); // check if id is valid
  }
  try{
    const updatedProduct = await productModel.findByIdAndUpdate(id, {title, description, images, price}, {new: true});
    res.status(200).json(updatedProduct);
  }catch(err){
    res.status(400).json({message: err.message});
  }
});

module.exports = router;