"use strict";

var _require = require('express'),
    Router = _require.Router; // Funciones desde el controlador


var _require2 = require("../../controllers/mes/material.controller"),
    createMaterial = _require2.createMaterial,
    getMaterials = _require2.getMaterials,
    getMaterialsById = _require2.getMaterialsById,
    getMaterialsByLine = _require2.getMaterialsByLine,
    updateMaterialById = _require2.updateMaterialById,
    deleteMaterialById = _require2.deleteMaterialById,
    updateMaterialToPLC = _require2.updateMaterialToPLC; //Importacion de Router express


var router = Router(); //Aqui las rutas necesarias --->
//Listar todos los materiales en la base de datos

router.get('/line', getMaterialsByLine);
router.get('/:materialId', getMaterialsById);
router.get('/', getMaterials);
router.put('/:materialId', updateMaterialById);
router["delete"]('/:materialId', deleteMaterialById); //Agregar nuevos materiales al base de datos

router.post('/updateplc', updateMaterialToPLC);
router.post('/', createMaterial);
module.exports = router;