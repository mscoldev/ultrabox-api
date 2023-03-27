const { Router } = require('express');


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

//Importacion de Router express
const router = Router();


//Aqui las rutas necesarias --->

//Listar todos los materiales en la base de datos

router.get('/line', getMaterialsByLine);
router.get('/:materialId', getMaterialsById);
router.get('/', getMaterials);
router.put('/:materialId', updateMaterialById);
router.delete('/:materialId', deleteMaterialById);


//Agregar nuevos materiales al base de datos
router.post('/updateplc', updateMaterialToPLC);
router.post('/', createMaterial);


module.exports = router;
