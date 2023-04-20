"use strict";

var _require = require('express'),
    Router = _require.Router; // Funciones desde el controlador


var _require2 = require("../../controllers/mes/recipe.controller"),
    createRecipe = _require2.createRecipe,
    getRecipe = _require2.getRecipe,
    updateRecipe = _require2.updateRecipe,
    deleteRecipeById = _require2.deleteRecipeById; //Importacion de Router express


var router = Router(); //Aqui las rutas necesarias --->

router.post('/', createRecipe);
router.get('/', getRecipe);
router.put('/:recipeId', updateRecipe);
router["delete"]('/:recipeId', deleteRecipeById);
module.exports = router;
//# sourceMappingURL=recipe.routes.js.map