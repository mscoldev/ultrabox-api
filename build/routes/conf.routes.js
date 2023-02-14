"use strict";

var _require = require('express'),
    Router = _require.Router;

var passport = require('passport'); // Funciones desde el controlador


var _require2 = require('../controllers/confApp.controller'),
    getConfActiveCompany = _require2.getConfActiveCompany,
    setConfCompany = _require2.setConfCompany; //Importacion de Router express


var router = Router(); //Aqui las rutas necesarias --->

router.get('/company', [passport.authenticate('jwt', {
  session: false
})], getConfActiveCompany);
router.put('/company', setConfCompany);
module.exports = router;