const { Router } = require('express');
const baseAuth = require('../baseAuth');

// Funciones desde el controlador
const {
  getProductionLogs,
  createProductionLog,
  updateFlagProductionLog,
} = require('../../controllers/mes/productionLogs.controller');

const { PRODUCTION_LOGS: NAME_MODULE } = require('../../constants/module_names');

const authenticate = baseAuth(NAME_MODULE);

const router = Router();

//Routes production

router.get('/', authenticate, getProductionLogs);
router.post('/', authenticate, createProductionLog);
router.put('/:_id', authenticate, updateFlagProductionLog);

module.exports = router;
