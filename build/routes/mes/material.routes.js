"use strict";

var _require = require('express'),
    Router = _require.Router;

var cors = require('cors');

var corsOptions = {
  credentials: false,
  preflightContinue: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  origin: "*"
}; // Funciones desde el controlador

var _require2 = require("../../controllers/mes/material.controller"),
    createMaterial = _require2.createMaterial,
    getMaterials = _require2.getMaterials,
    getMaterialsById = _require2.getMaterialsById,
    updateMaterialById = _require2.updateMaterialById,
    deleteMaterialById = _require2.deleteMaterialById; //Importacion de Router express


var router = Router(); //Aqui las rutas necesarias --->
//Listar todos los materiales en la base de datos

router.get('/', cors(corsOptions), getMaterials);
router.get('/:materialId', getMaterialsById);
router.put('/:materialId', updateMaterialById);
router["delete"]('/:materialId', deleteMaterialById); //Agregar nuevos materiales al base de datos

router.post('/', createMaterial);
module.exports = router;