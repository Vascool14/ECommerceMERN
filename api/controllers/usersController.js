const userModel = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SECRET = bcrypt.genSaltSync(10);

//GET all users
const getUsers = async (req, res) => {
    const users = await userModel.find({}).sort({createdAt: -1});
    res.status(200).json({users});
}

//GET one user
const getUser = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'User not found'}); // check if id is not valid
    }
    return res.status(200).json({user: await userModel.findById(id)}); // return user
}

//Create one user
const createUser = async (req, res) => {
    const {username, mail, password, avatar, wishlist, cart} = req.body;
    try{
        const userDoc = await userModel.create({ 
            username, 
            mail, 
            password,
            avatar,
            wishlist,
            cart
        })
        res.json(userDoc);
    }
    catch(e){
        res.status(422).json(e);
    }
}

//Update one user
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { wishlist, cart } = req.body;
    try {
        const user = await userModel.findById(id);
        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }
        // Update wishlist and cart fields only
        user.wishlist = wishlist || user.wishlist;
        user.cart = cart || user.cart;
        // Save changes
        await user.save();
        return res.status(200).json({ message: 'User updated successfully' });
    }catch(err){
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser
}
