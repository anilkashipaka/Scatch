const userModel = require('../models/usermodel');
const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
    try {
        if( !req.cookies.token){
        req.flash('error','you must be logged in');
        return res.redirect('/'); 
        }
       
        const decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        const user = await userModel.findOne({email: decode.email}).select('-password');
        req.user = user;
        next();
    } catch (error) {
        req.flash('error','something went wrong');
        res.redirect('/');
    }
}





module.exports.isLoggedIn = isLoggedIn;