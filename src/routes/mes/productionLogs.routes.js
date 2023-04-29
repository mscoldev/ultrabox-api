const { Router } = require('express');

// Funciones desde el controlador
const {
  getProductionLogs,
  createProductionLog,
  updateFlagProductionLog,
} = require('../../controllers/mes/productionLogs.controller');

const router = Router();

//Routes production

router.get('/', getProductionLogs);
router.post('/', createProductionLog);
router.put('/:_id', updateFlagProductionLog);

module.exports = router;
