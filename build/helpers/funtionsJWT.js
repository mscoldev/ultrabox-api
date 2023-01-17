"use strict";

var jwt = require('jsonwebtoken');

var generateJWT = function generateJWT() {
  var uid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return new Promise(function (resolve, reject) {
    var payload = {
      uid: uid
    };
    jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn: '1h'
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
    console.log(payload);
    jwt.verify(payload, process.env.SECRETORPRIVATEKEY, function (err, decoded) {
      if (err) {
        console.log(err);
        reject('Token invalido');
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