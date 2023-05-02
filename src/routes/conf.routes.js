const { Router } = require('express');
const passport = require('passport');

// Funciones desde el controlador
const {
  getConfActiveCompany,
  setConfCompany,
  setConnectionDeviceController,
  updateConnectionDeviceController,
} = require('../controllers/confApp.controller');

//Importacion de Router express
const router = Router();

//Aqui las rutas necesarias --->

router.get(
  '/company',
  [passport.authenticate('jwt', { session: false })],
  getConfActiveCompany
);

router.put('/company', setConfCompany);

//CONFIGURACIÓN DE DEVICES
router.post('/connection/device/controller', setConnectionDeviceController);
router.put(
  '/connection/device/controller/:_id',
  updateConnectionDeviceController
);

module.exports = router;
