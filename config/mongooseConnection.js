require('dotenv').config();
const mongoose = require('mongoose');
const mongourl = process.env.MONGODB_URI;

console.log("MongoDB URI from .env:", mongourl);

mongoose.connect(mongourl)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.error("Error connecting to MongoDB", err);
});


module.exports = mongoose.connection;