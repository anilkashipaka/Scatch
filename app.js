const express = require('express');
const app = express(); 
const cookieParser = require('cookie-parser');
const path = require('path');

const usermodel = require('./models/usermodel');
const productmodel = require('./models/productmodel');

//data reading from req as json and urlendl
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//use for public access
app.use(express.static(path.join(__dirname, 'public')));
//cookie reader
app.use(cookieParser());
//ejs loader
app.use('view engine', "ejs");

app.get('/', (req, res) =>{
res.send('Welcome');
});


app.listen(3000,() => {
    console.log("Server is running on port 3000");
})
