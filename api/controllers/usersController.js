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
    return res.status(200).json({user});
}

//Create one user
const createUser = async (req, res) => {
    const {username, email, password, avatar, wishlist, cart} = req.body;
    try{
        const userDoc = await userModel.create({ 
            username, 
            email, 
            password: bcrypt.hashSync(password, SECRET),
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

module.exports = {
    getUsers,
    getUser,
    createUser
}
