const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose'); 
const productsRoute = require('./routes/productsRoute');
const usersRoute = require('./routes/usersRoute');

//express app
const app = express();

//middleware 
app.use(express.json()); //built-in function in Express, parses incoming requests with JSON payloads and is based on body-parser.

app.use(cors({origin: 'http://localhost:5173'})); // allows requests from the specified origin

app.use((req, res, next) => { 
    console.log(req.path, req.method); 
    next(); 
}); // this is a middleware function that logs the path and method of every request to the console


//routes
app.use('/products', productsRoute);
app.use('/users', usersRoute);


//CONNECT to db
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
    .then(() => {  
        app.listen(process.env.PORT);  //listen for requests
    })
    .catch((err) => {
        console.log(err)
    });

