const mongoose = require('mongoose');
require('dotenv').config();
const mongourl = process.env.MONGODB_URL;

mongoose.connect(mongourl)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.error("Error connecting to MongoDB", err);
});


module.exports = mongoose.connection;