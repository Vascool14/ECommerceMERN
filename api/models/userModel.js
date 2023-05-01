const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    username: {
        type: String,
        required: true
    },
    mail: {
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
    cart: {
        type: Array,
        required: false
    },
    wishlist: {
        type: Array,
        required: false
    },
    recentlyViewed: {
        type: Array,
        required: false
    },
    role: {
        type: String,
        required: true
    },
},{ versionKey: false });  // Disable the version key

module.exports = mongoose.model('userModel', userSchema);