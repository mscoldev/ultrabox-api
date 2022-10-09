
const { Router } = require('express');

// Funciones desde el controlador
const { authGet } = require('../controllers/auth.controller');

//Importacion de Router express
const router = Router();


//Aqui las rutas necesarias --->

router.get('/', authGet);

module.exports = router;