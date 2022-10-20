"use strict";

var _require = require('express'),
    Router = _require.Router; // Funciones desde el controlador


var _require2 = require('../controllers/recipe.controller'),
    recipePost = _require2.recipePost; //Importacion de Router express


var router = Router(); //Aqui las rutas necesarias --->

router.post('/', recipePost);
module.exports = router;