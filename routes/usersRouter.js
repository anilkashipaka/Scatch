const express = require('express');
const router = express.Router();

const { registeruser , loginuser} = require('../controllers/authController');

router.get('/', function (req, res) {
    res.send('user routes found');
})


router.post('/register', registeruser);


router.post('/login', loginuser);
module.exports = router