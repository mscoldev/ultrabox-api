const { Router } = require('express');
const cors = require('cors');


const corsOptions = {
    credentials: false,
    preflightContinue: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    origin: "*"
}

// Funciones desde el controlador
const {
    createMaterial,
    getMaterials,
    getMaterialsById,
    updateMaterialById,
    deleteMaterialById
} = require("../../controllers/mes/material.controller");

//Importacion de Router express
const router = Router();


//Aqui las rutas necesarias --->

//Listar todos los materiales en la base de datos
router.get('/', cors(corsOptions), getMaterials);

router.get('/:materialId', getMaterialsById);

router.put('/:materialId', updateMaterialById);

router.delete('/:materialId', deleteMaterialById);

//Agregar nuevos materiales al base de datos
router.post('/', createMaterial);


module.exports = router;