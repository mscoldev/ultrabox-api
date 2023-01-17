const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {

    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        })
    })

}

const verifyJWT = (token = '') => {

    return new Promise((resolve, reject) => {
        const payload = token;
        console.log(payload);
        jwt.verify(payload, process.env.SECRETORPRIVATEKEY, (err, decoded) => {
            if (err) {
                console.log(err);
                reject('Token invalido');
            } else {
                resolve(decoded);
            }
        })
    })
}

module.exports = {
    generateJWT,
    verifyJWT
}