"use strict";

var _require = require('express'),
    Router = _require.Router; // Funciones desde el controlador


var _require2 = require('../controllers/material.controller'),
    materialPost = _require2.materialPost,
    getMaterials = _require2.getMaterials,
    getMaterialsById = _require2.getMaterialsById,
    updateMaterialById = _require2.updateMaterialById,
    deleteMaterialById = _require2.deleteMaterialById; //Importacion de Router express


var router = Router(); //Aqui las rutas necesarias --->
//Listar todos los materiales en la base de datos

router.get('/', getMaterials);
router.get('/:materialId', getMaterialsById);
router.put('/:materialId', updateMaterialById);
router["delete"]('/:materialId', deleteMaterialById); //Agregar nuevos materiales al base de datos

router.post('/', materialPost);
module.exports = router;