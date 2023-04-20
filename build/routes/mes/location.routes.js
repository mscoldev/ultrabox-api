"use strict";

var _require = require('express'),
    Router = _require.Router; // Funciones desde el controlador


var _require2 = require('../../controllers/mes/location.controller'),
    getLocation = _require2.getLocation,
    createNewLocation = _require2.createNewLocation,
    updateLocationById = _require2.updateLocationById,
    deleteLocationById = _require2.deleteLocationById;

var router = Router(); //Routes production

router.get('/', getLocation);
router.get('/:_id', getLocation);
router.post('/', createNewLocation);
router.put('/:_id', updateLocationById);
router["delete"]('/:_id', deleteLocationById);
module.exports = router;
//# sourceMappingURL=location.routes.js.map