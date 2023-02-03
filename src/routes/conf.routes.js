
const { Router } = require('express');



// Funciones desde el controlador
const { getConfActiveCompany, setConfCompany } = require('../controllers/confApp.controller');


//Importacion de Router express
const router = Router();


//Aqui las rutas necesarias --->


router.get('/company', getConfActiveCompany);

router.put('/company', setConfCompany);


module.exports = router;