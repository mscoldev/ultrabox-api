const { response, request } = require('express');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();


//TODO: Implements Singleton Pattern
const signUp = async(req = request, res = response) => {
const {username, email, password, roles} = req.body;

    const newUser = new User({
        username,
        email,
        password:await User.encryptPassword(password)
    })

    const savedUser = await newUser.save();
    
    //*Return TOKEN to FRONTEND
   const token = jwt.sign({ id: savedUser._id },process.env.SECRET_KEY, {
       expiresIn: 86400 //*24 Hours
   })

   res.status(200).json({token});
}



const signIn = async (req = request, res = response) => {
res.json('signIn')
}


module.exports = {
signUp,
signIn
}
