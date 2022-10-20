"use strict";

var _require = require('express'),
    Router = _require.Router; // Funciones desde el controlador


var _require2 = require('../controllers/auth.controller'),
    signIn = _require2.signIn,
    signUp = _require2.signUp; //Importacion de Router express


var router = Router(); //Aqui las rutas necesarias --->

router.post('/signup', signUp);
router.post('/signin', signIn);
module.exports = router;