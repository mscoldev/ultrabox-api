"use strict";

var _require = require('express'),
    Router = _require.Router; // Funciones desde el controlador


var _require2 = require('../controllers/api.controller'),
    apiGet = _require2.apiGet; //Importacion de Router express


var router = Router(); //Aqui las rutas necesarias --->

router.get('/', apiGet);
module.exports = router;