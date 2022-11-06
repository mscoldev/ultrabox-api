const { Router } = require('express');

// Funciones desde el controlador
const { recipeMaterialCreate } = require('../controllers/recipeMaterial.controller');

//Importacion de Router express
const router = Router();


//Aqui las rutas necesarias --->

router.post('/', recipeMaterialCreate);

module.exports = router;