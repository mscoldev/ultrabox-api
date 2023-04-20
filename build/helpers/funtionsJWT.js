"use strict";

var jwt = require('jsonwebtoken');

var generateJWT = function generateJWT() {
  var uid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return new Promise(function (resolve, reject) {
    var payload = {
      uid: uid
    };
    jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '6h'
    }, function (err, token) {
      if (err) {
        console.log(err);
        reject('No se pudo generar el token');
      } else {
        resolve(token);
      }
    });
  });
};

var verifyJWT = function verifyJWT() {
  var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return new Promise(function (resolve, reject) {
    var payload = token;
    jwt.verify(payload, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        reject({
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
        });
      } else {
        resolve(decoded);
      }
    });
  });
};

module.exports = {
  generateJWT: generateJWT,
  verifyJWT: verifyJWT
};
//# sourceMappingURL=funtionsJWT.js.map