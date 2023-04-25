const express = require('express');
const { 
    getUsers,
    getUser,
    createUser
} = require('../controllers/usersController');

const router = express.Router();

//GET all users
router.get('/', getUsers);

//GET one user
router.get('/:id', getUser);

//Create one user
router.post('/', createUser);

module.exports = router;