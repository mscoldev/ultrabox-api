"use strict";

var _require = require('express'),
    Router = _require.Router; // Funciones desde el controlador


var _require2 = require('../../controllers/mes/productionLogs.controller'),
    getProductionLogs = _require2.getProductionLogs,
    createProductionLog = _require2.createProductionLog,
    updateFlagProductionLog = _require2.updateFlagProductionLog;

var router = Router(); //Routes production

router.get('/', getProductionLogs);
router.post('/', createProductionLog);
router.put('/:_id', updateFlagProductionLog);
module.exports = router;
//# sourceMappingURL=productionLogs.routes.js.map