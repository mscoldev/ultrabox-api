const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model')

const validateJWT = async (req = request, res = response, next) => {
    const url = req.url;
    const tokenBearer = req.headers.authorization?.split(" ")[1]

    if (url == "/api/auth/login") {
        next();
    } else {
        if (!tokenBearer) {
            return res.status(401).json({ msg: 'Sin autorización: Su Token no es valido o debe registrarse antes de realizar la operacion.' });
        }

        try {
            const { uid } = jwt.verify(tokenBearer, process.env.SECRETORPRIVATEKEY);
            const dataToken = jwt.decode(tokenBearer, process.env.SECRETORPRIVATEKEY)
            console.log(dataToken);
            const user = await User.findById(uid)

            req.user = user;

            next();
        } catch (error) {
            res.status(403).json({ msg: 'Token no valido' })
        }
    }
};


module.exports = {
    validateJWT
}