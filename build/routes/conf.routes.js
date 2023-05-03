"use strict";

var _require = require('express'),
    Router = _require.Router;

var passport = require('passport'); // Funciones desde el controlador


var _require2 = require('../controllers/confApp.controller'),
    getConfActiveCompany = _require2.getConfActiveCompany,
    setConfCompany = _require2.setConfCompany,
    setConnectionDeviceController = _require2.setConnectionDeviceController,
    updateConnectionDeviceController = _require2.updateConnectionDeviceController; //Importacion de Router express


var router = Router(); //Aqui las rutas necesarias --->

router.get('/company', [passport.authenticate('jwt', {
  session: false
})], getConfActiveCompany);
router.put('/company', setConfCompany); //CONFIGURACIÓN DE DEVICES

router.post('/connection/device/controller', setConnectionDeviceController);
router.put('/connection/device/controller/:_id', updateConnectionDeviceController);
module.exports = router;
//# sourceMappingURL=conf.routes.js.map