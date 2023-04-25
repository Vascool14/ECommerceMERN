const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    mail: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        required: false
    },
    wishlist: {
        type: Array,
        required: false
    },
});

module.exports = mongoose.model('userModel', userSchema);