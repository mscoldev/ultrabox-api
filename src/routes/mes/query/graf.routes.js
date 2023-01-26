const { Router } = require('express');

// Funciones desde el controlador
const { getGraficsMolinos, getGraficskwton } = require("../../../controllers/mes/graf/grafics.controller");

//Importacion de Router express
const router = Router();

router.get('/molinos', getGraficsMolinos);
router.get('/kwton', getGraficskwton);

//Aqui las rutas necesarias --->

//Listar todos los materiales en la base de datos



module.exports = router;