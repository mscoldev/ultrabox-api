"use strict";

var _require = require('express'),
    Router = _require.Router; // Funciones desde el controlador


var _require2 = require('../../controllers/mes/location.controller'),
    getLocation = _require2.getLocation;

var router = Router(); //Routes production

router.get('/', getLocation);
router.get('/:_id', getLocationById);
router.post('/', getLocation);
router.put('/:_id', getLocation);
router["delete"]('/:_id', getLocation);
module.exports = router;