const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model')

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({ msg: 'Sin autorización' });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid)

        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token no valido' })
    }

};


module.exports = {
    validateJWT
}