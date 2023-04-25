const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({ 
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
});

module.exports = mongoose.model('productModel', productSchema);