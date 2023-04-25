const productModel = require('../models/productModel');
const mongoose = require('mongoose');

//GET all products
const getProducts = async (req, res) => {
    const products = await productModel.find({}).sort({createdAt: -1});
    res.status(200).json({products});
}

//POST one Product
const createProduct = async (req, res) => {
    const {title, description, images, price} = req.body;
    //add to db
    try{
        const product = await productModel.create({title, description, images, price});
        res.status(200).json({product});
    }catch(err){
        res.status(400).json({message: err.message});
    }
}

//DELETE one Product
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Product not found'}); // check if id is valid
    } 
    const product = await productModel.findOneAndDelete({_id: id});
    if(!product) return res.status(404).json({message: 'Product not found'}); // check if product exists
    res.status(200).json({message: 'Product deleted: '+ product.title});
}

module.exports = {
    getProducts,
    createProduct,
    deleteProduct
}