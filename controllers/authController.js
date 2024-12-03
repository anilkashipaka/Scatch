const userModel = require('../models/usermodel');
const bcrypt = require('bcrypt')
const { generatetoken } = require('../utils/generateToken');

const registeruser = async (req, res) => {
    try {
        const {fullname, email, password} = req.body;
        
        const user = await userModel.findOne({email});
        if (user) return res.status(501).send('you have accout,please log in');
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                const user = await userModel.create({
                    fullname,
                    email,
                    password: hash
                })
                const token = generatetoken(user);
                res.cookie("token",token);
                res.send(user);
            })
        })
    } catch (error) {
        res.send(error.message);
    }
}

const loginuser = async (req, res) => {
    try {
        console.log(req.query);
        const {email, password} = req.body;
        const user = await userModel.findOne({email: email});
        if(!user) return res.status(401).send('email or password is incorrect');
        bcrypt.compare(password, user.password, (err, result) => {
            if(err) return res.status(500).send(err.message);
            if(result){
                const token = generatetoken(user);
                res.cookie("token",token);
                res.send('you can login');
            }
            else{
                res.status(401).send('email or password is incorrect');
            }

        })    
    } catch (error) {
        res.send(error.message);
    }
}
module.exports.registeruser = registeruser;
module.exports.loginuser = loginuser;