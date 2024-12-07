const express = require('express');
const router = express.Router();

const {isLoggedIn} = require('../middlewares/isLoggedIn');

const productModel = require('../models/productmodel');
router.get('/', (req, res) => {
     const error = req.flash('error');
     res.render("index", {error: error});
})

router.get('/shop', isLoggedIn, async (req, res) => {
   const products =  await productModel.find();
   res.render('shop', {products: products});
})

module.exports = router;