"use strict";

var _require = require('express'),
    Router = _require.Router; // Funciones desde el controlador


var _require2 = require("../../controllers/mes/productionLogs.controller"),
    getProductionLogs = _require2.getProductionLogs,
    createProductionLog = _require2.createProductionLog;

var router = Router(); //Routes production

router.get('/', getProductionLogs);
router.post('/', createProductionLog);
module.exports = router;
//# sourceMappingURL=productionLogs.routes.js.map