const express = require('express');
const { 
    getProducts,
    createProduct,
    deleteProduct
} = require('../controllers/productsController');

const router = express.Router();

//GET all products
router.get('/', getProducts);

//POST one product
router.post('/', createProduct);

//DELETE one product
router.delete('/:id', deleteProduct);

module.exports = router;