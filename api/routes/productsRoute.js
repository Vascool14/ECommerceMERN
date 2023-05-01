const express = require('express');
const productModel = require('../models/productModel');

const router = express.Router();

//GET all products
router.get('/', async (req, res) => {
    const products = await productModel.find({}).sort({createdAt: -1});
    res.status(200).json({products});
});

//POST one product
router.post('/', async (req, res) => {
    const {title, description, images, price} = req.body;
    //add to db
    try{
        const product = await productModel.create({title, description, images, price});
        res.status(200).json({product});
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

//DELETE one product
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Product not found'}); // check if id is valid
    } 
    const product = await productModel.findOneAndDelete({_id: id});
    if(!product) return res.status(404).json({message: 'Product not found'}); // check if product exists
    res.status(200).json({message: 'Product deleted: '+ product.title});
});

//ADD product id to one user's recently viewed products
router.patch('/recently-viewed/:id', async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Product not found'}); // check if id is valid
    }
    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(404).json({message: 'User not found'}); // check if id is valid
    }
});

module.exports = router;