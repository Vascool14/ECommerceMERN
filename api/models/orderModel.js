const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({ 
    user: {
        type: mongoose.Schema.Types.ObjectId, // this is the type of the ID of the user
        ref: 'userModel',
        required: true
    },
    userNumber: {
        type: String,
        required: true
    },
    products: {
        type: Array, // Array of product IDs
        required: true
    },
    total: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: new Date().toISOString(), 
        required: true
    },
    address: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('orderModel', orderSchema);