
const { Router } = require('express');
const passport = require('passport');


// Funciones desde el controlador
const { getConfActiveCompany, setConfCompany } = require('../controllers/confApp.controller');


//Importacion de Router express
const router = Router();


//Aqui las rutas necesarias --->


router.get('/company', passport.authenticate('jwt', {
    session: false
}), getConfActiveCompany);

router.put('/company/:id', setConfCompany);


module.exports = router;