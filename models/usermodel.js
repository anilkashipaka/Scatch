const mongoose = require('mongoose');


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

module.exports = mongoose.model('user', userSchema);
