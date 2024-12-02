const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send('owner routes found');
})

module.exports = router
