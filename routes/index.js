const express = require('express');
const router = express.Router();

const {isLoggedIn} = require('../middlewares/isLoggedIn');

const productModel = require('../models/productmodel');
const userModel = require('../models/usermodel');
router.get('/', (req, res) => {
     const error = req.flash('error');
     res.render("index", {error: error, LoggedIn: false});
})

router.get('/shop', isLoggedIn, async (req, res) => {
   const products =  await productModel.find();
   const success = req.flash('success');
   res.render('shop', {products, success});
})
router.get('/cart', isLoggedIn, async (req, res) => {
    const user = await userModel.findOne({email: req.user.email}).populate('cart');
   res.render('cart', { user});
})

router.get('/addtocart/:productId', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({email: req.user.email});

    user.cart.push(req.params.productId);
     await user.save();
    req.flash('success', 'Product added to cart');
    res.redirect('/shop');
})

module.exports = router;