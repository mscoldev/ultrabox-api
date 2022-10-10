const { Router } = require('express');

// Funciones desde el controlador
const { 
    materialPost,
    getMaterials
 } = require('../controllers/material.controller');

//Importacion de Router express
const router = Router();


//Aqui las rutas necesarias --->

//Listar todos los materiales en la base de datos
router.get('/materials', getMaterials);

//Agregar nuevos materiales al base de datos
router.post('/material', materialPost);


module.exports = router;