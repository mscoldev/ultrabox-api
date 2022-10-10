const { Router } = require('express');

// Funciones desde el controlador
const { materialPost } = require('../controllers/material.controller');

//Importacion de Router express
const router = Router();


//Aqui las rutas necesarias --->

router.post('/', materialPost);

module.exports = router;