const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    discount: { type: Number },
    image: { type: String },
    panelcolor: { type: String },
    bgcolor: { type: String },
    textcolor: { type: String },
})

module.exports = mongoose.model('product', productSchema);
