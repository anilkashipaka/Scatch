const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:2701/scatch');

const userSchema = mongoose.Schema({
    fullname: { type: String },
    email: { type: String },
    password: { type: String },
    cart: [{ type: Array, default : [] }],
    isAdmin: { type: Boolean },
    orders: [{ type: Array, default : [] }],
    contact: { type: Number },
    picture: { type: String, default: '' }
})

module.exports = mongoose.model('User', userSchema);
