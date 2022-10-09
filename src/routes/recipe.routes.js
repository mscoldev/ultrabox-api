const { Router } = require('express');

// Funciones desde el controlador
const { recipePost } = require('../controllers/recipe.controller');

//Importacion de Router express
const router = Router();


//Aqui las rutas necesarias --->

router.post('/', recipePost);

module.exports = router;