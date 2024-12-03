const jwt = require('jsonwebtoken');
const generatetoken = function( user ){
    return jwt.sign({email: user.email, id: user.id}, process.env.JWT_KEY);  // 1 hour expiration
}

module.exports.generatetoken = generatetoken;