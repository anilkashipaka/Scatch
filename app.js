require('dotenv').config();

const express = require('express');
const app = express(); 
const cookieParser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash');

const db = require('./config/mongooseConnection');

const index = require('./routes/index');
const ownersRouter = require('./routes/ownersRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');

const usermodel = require('./models/usermodel');
const productmodel = require('./models/productmodel');


app.use(
    expressSession({
        secret: process.env.EXPRESS_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
)
app.use(flash());

//data reading from req as json and urlendl
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//use for public access
app.use(express.static(path.join(__dirname, 'public')));
//cookie reader
app.use(cookieParser());
//ejs loader
app.set('view engine', "ejs");

app.use('/', index);
app.use('/owners', ownersRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

app.listen(3000,() => {
    console.log("Server is running on port 3000");
})
