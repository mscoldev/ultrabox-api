const { Router } = require('express');

// Funciones desde el controlador
const { recipePost, getRecipe } = require('../controllers/recipe.controller');

//Importacion de Router express
const router = Router();


//Aqui las rutas necesarias --->

router.post('/', recipePost);
router.get('/', getRecipe);

module.exports = router;