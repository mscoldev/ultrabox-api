const { Router } = require('express');

// Funciones desde el controlador
const { createRecipe, getRecipe, updateRecipe } = require('../controllers/recipe.controller');

//Importacion de Router express
const router = Router();


//Aqui las rutas necesarias --->

router.post('/', createRecipe);
router.get('/', getRecipe);
router.put('/:recipeId', updateRecipe);

module.exports = router;