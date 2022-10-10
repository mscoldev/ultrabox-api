const { Router } = require('express');

// Funciones desde el controlador
const { 
    materialPost,
    getMaterials,
    getMaterialsById,
    updateMaterialById,
    deleteMaterialById
 } = require('../controllers/material.controller');

//Importacion de Router express
const router = Router();


//Aqui las rutas necesarias --->

//Listar todos los materiales en la base de datos
router.get('/', getMaterials);

router.get('/:materialId', getMaterialsById);

router.put('/:materialId', updateMaterialById);

router.delete('/:materialId', deleteMaterialById);

//Agregar nuevos materiales al base de datos
router.post('/', materialPost);


module.exports = router;