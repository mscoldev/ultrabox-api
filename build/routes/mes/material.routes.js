"use strict";

var _require = require('express'),
    Router = _require.Router; // Funciones desde el controlador


var _require2 = require("../../controllers/mes/material.controller"),
    createMaterial = _require2.createMaterial,
    getMaterials = _require2.getMaterials,
    getMaterialsById = _require2.getMaterialsById,
    getMaterialsByLine = _require2.getMaterialsByLine,
    updateMaterialById = _require2.updateMaterialById,
    deleteMaterialById = _require2.deleteMaterialById; //Importacion de Router express


var router = Router(); //Aqui las rutas necesarias --->
//Listar todos los materiales en la base de datos

router.get('/line', getMaterialsByLine);
router.get('/:materialId', getMaterialsById);
router.get('/', getMaterials); //Agregar nuevos materiales al base de datos

router.post('/', createMaterial);
module.exports = router;