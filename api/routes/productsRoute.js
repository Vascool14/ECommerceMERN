const express = require('express');
const productModel = require('../models/productModel');
const newsModel = require('../models/newsModel');

const router = express.Router(); 

//GET all products
router.get('/', async (req, res) => {
    const products = await productModel.find({});
    res.status(200).json({products});
});

//GET news array 
router.get('/news', async (req, res) => {
    const news = await newsModel.find({}); 
    res.status(200).json({news});
});

//Add user review to product
router.patch('/review/:id', async (req, res) => {
    const { id } = req.params;
    const { userAvatar, username, review, rating } = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Product not found'}); // check if id is valid
    }
    const product = await productModel.findById(id);
    if(!product) return res.status(404).json({message: 'Product not found'}); // check if product exists
    const newReview = { userAvatar, username, review, rating }; // create new review

    product.reviews.push(newReview);
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    await product.save();
    res.status(200).json({product});
});

//ADD product id to one user's recently viewed products
// router.patch('/recently-viewed/:id', async (req, res) => {
//     const { id } = req.params;
//     const { userId } = req.body;
//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({message: 'Product not found'}); // check if id is valid
//     }
//     if(!mongoose.Types.ObjectId.isValid(userId)){
//         return res.status(404).json({message: 'User not found'}); // check if id is valid
//     }

// });

module.exports = router;