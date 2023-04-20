"use strict";

var _require = require('express'),
    Router = _require.Router;

var passport = require('passport'); //*Funciones desde el controlador


var _require2 = require('../../controllers/tools/units.controller'),
    getUnits = _require2.getUnits,
    createUnit = _require2.createUnit,
    updateUnitById = _require2.updateUnitById,
    deleteUnitById = _require2.deleteUnitById; //*Importación de Router express


var router = Router(); //*Rutas necesarias

router.get('/units', getUnits);
router.post('/unit', createUnit);
router.put('/unit/:_id', updateUnitById);
router["delete"]('/unit/:_id', deleteUnitById);
module.exports = router;
//# sourceMappingURL=units.routes.js.map