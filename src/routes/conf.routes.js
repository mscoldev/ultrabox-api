const { Router } = require('express');
const baseAuth = require('./baseAuth');

// Funciones desde el controlador
const {
  getConfActiveCompany,
  setConfCompany,
  setConnectionDeviceController,
  updateConnectionDeviceController,
} = require('../controllers/confApp.controller');

const { CONF: NAME_MODULE } = require('../constants/module_names');

const authenticate = baseAuth(NAME_MODULE);

//Importacion de Router express
const router = Router();

//Aqui las rutas necesarias --->

router.get(
  '/company',
  authenticate,
  getConfActiveCompany
);

router.put('/company', authenticate, setConfCompany);

//CONFIGURACIÓN DE DEVICES
router.post('/connection/device/controller', authenticate, setConnectionDeviceController);
router.put(
  '/connection/device/controller/:_id',
  authenticate,
  updateConnectionDeviceController
);

module.exports = router;
