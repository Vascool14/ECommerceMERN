const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose'); 
const productsRoute = require('./routes/productsRoute');
const usersRoute = require('./routes/usersRoute');
const adminRoute = require('./routes/adminRoute')

//EXPRESS APP >>>
const app = express();

//MIDDLEWARE >>>
app.use(express.json()); //built-in function in Express, parses incoming requests with JSON payloads and is based on body-parser
app.use(cors({
    origin: ['http://192.168.100.130:5173', 'http://192.168.241.88:5173','http://192.168.1.10:5173'],  // allows requests from the specified origins
    credentials: true  // allows the server to set cookies on the client
})); 
app.use((req, res, next) => { 
    console.log(`${req.method} ${req.path}`);
    next();
}); //middleware function to log the request method and path

//ROUTES >>>>
app.use('/products', productsRoute);
app.use('/users', usersRoute);
app.use('/admin', adminRoute);

//CONNECT TO DB AND START SERVER >>>
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
    .then(() => app.listen(process.env.PORT)) //listen for requests
    .catch((err) => console.log(err)); //catch errors