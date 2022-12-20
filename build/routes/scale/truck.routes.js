"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../../middlewares/validateJWT'),
    validateJWT = _require2.validateJWT;

var _require3 = require('../../controllers/scale/truck.controller'),
    getTrucks = _require3.getTrucks,
    getTruckById = _require3.getTruckById,
    updateTruckById = _require3.updateTruckById,
    deleteTruckById = _require3.deleteTruckById,
    createTruck = _require3.createTruck;

var router = Router();
router.get('/', getTrucks);
router.get('/:id', getTruckById);
router.put('/:id', [validateJWT], updateTruckById);
router.post('/', [validateJWT], createTruck);
router["delete"]('/:id', [validateJWT], deleteTruckById);
module.exports = router;