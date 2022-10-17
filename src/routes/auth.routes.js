
const { Router } = require('express');

// Funciones desde el controlador
const { signIn,signUp } = require('../controllers/auth.controller');

//Importacion de Router express
const router = Router();


//Aqui las rutas necesarias --->



router.post('/signup', signUp);
router.post('/signin', signIn);



module.exports = router;