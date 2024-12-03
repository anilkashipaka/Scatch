const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ownerModel = require('../models/ownerModel');

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
router.get('/', function (req, res) {
    res.send('owner routes found');
})


module.exports = router
