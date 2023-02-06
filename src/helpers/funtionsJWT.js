const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {

    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '6h'
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
        jwt.verify(payload, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                reject(
                    {
                        isBoom: true,
                        output: {
                            statusCode: 400,
                            payload: {
                                statusCode: 400,
                                error: "Bad Request",
                                message: 'Token Invalido',
                                expired: true
                            }
                        }

                    }
                );
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