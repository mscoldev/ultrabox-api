
const { Router } = require('express');

// Funciones desde el controlador
const { apiGet } = require('../controllers/api.controller');

//Importacion de Router express
const router = Router();


//Aqui las rutas necesarias --->

router.get('/', apiGet);

module.exports = router;