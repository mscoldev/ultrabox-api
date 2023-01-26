"use strict";

var _require = require('express'),
    Router = _require.Router; // Funciones desde el controlador


var _require2 = require("../../../controllers/mes/graf/grafics.controller"),
    getGraficsMolinos = _require2.getGraficsMolinos,
    getGraficskwton = _require2.getGraficskwton; //Importacion de Router express


var router = Router();
router.get('/molinos', getGraficsMolinos);
router.get('/kwton', getGraficskwton); //Aqui las rutas necesarias --->
//Listar todos los materiales en la base de datos

module.exports = router;