const { Router } = require('express');
const baseAuth = require('../baseAuth')

// Funciones desde el controlador
const {
  createMaterial,
  getMaterials,
  getMaterialsById,
  getMaterialsByLine,
  updateMaterialById,
  deleteMaterialById,
  updateMaterialToPLC
} = require("../../controllers/mes/material.controller");
const { MATERIAL: NAME_MODULE } = require('../../constants/module_names');

//Importacion de Router express
const router = Router();

const authenticate = baseAuth(NAME_MODULE);


//Aqui las rutas necesarias --->

//Listar todos los materiales en la base de datos

router.get('/line', authenticate, getMaterialsByLine);
router.get('/:materialId', authenticate, getMaterialsById);
router.get('/', authenticate, getMaterials);
router.put('/:materialId', authenticate, updateMaterialById);
router.delete('/:materialId', authenticate, deleteMaterialById);


//Agregar nuevos materiales al base de datos
router.post('/updateplc', authenticate, updateMaterialToPLC);
router.post('/', authenticate, createMaterial);


module.exports = router;
