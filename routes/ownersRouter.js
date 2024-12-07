const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const upload = require('../config/multer-config');

const ownerModel = require('../models/ownerModel');
const productModel = require('../models/productmodel');
if( process.env.NODE_ENV === 'development'){
    router.post('/create', async (req, res) => {
        try {
            const ownerCount = await ownerModel.find();
            if ( ownerCount  > 0) {
                return res.status(400).send('Owner already exists');
            }
            const {fullname, email, password} = req.body;
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) return res.send(err.message);
                    const createdOwner = await ownerModel.create({
                        fullname,
                        email,
                        password: hash
                    })
                    jwt.sign({email: email, id: createdOwner.id})
                    req.cookies("token",'sss');
                    res.send(createdOwner);
                })
            })
        } catch (error) {
            res.send(error.message);
        }
    })
}
router.get('/admin', function (req, res) {
    const success = req.flash('success');
    res.render('createproducts', {success: success});
})

router.post('/product/create',upload.single('image'), async function (req, res) {
try {
    const { name    , 
     price    ,
     discount ,
     panelcolor,
     bgcolor  , 
     textcolor
    }  = req.body;
     const img = req.file.buffer
     const product = await productModel.create({
         image: img,
         name,
         price,
         discount,
         panelcolor,
         bgcolor,
         textcolor
     })
     req.flash('success','Successfully created product.')
     res.redirect('/owners/admin');
    
} catch (error) {
    res.send(error.message);
}
})


module.exports = router
