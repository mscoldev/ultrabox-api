const { Router } = require('express');
const baseAuth = require('../baseAuth');

// Funciones desde el controlador
const { createRecipe,
    getRecipe,
    updateRecipe,
    deleteRecipeById } = require("../../controllers/mes/recipe.controller");

const { RECIPE: NAME_MODULE } = require('../../constants/module_names');

const authenticate = baseAuth(NAME_MODULE);

//Importacion de Router express
const router = Router();


//Aqui las rutas necesarias --->

router.post('/', authenticate, createRecipe);
router.get('/', authenticate, getRecipe);
router.put('/:recipeId', authenticate, updateRecipe);
router.delete('/:recipeId', authenticate, deleteRecipeById);

module.exports = router;