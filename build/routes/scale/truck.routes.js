"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../../controllers/scale/truck.controller'),
    getTrucks = _require2.getTrucks,
    getTruckById = _require2.getTruckById,
    updateTruckById = _require2.updateTruckById,
    deleteTruckById = _require2.deleteTruckById,
    createTruck = _require2.createTruck;

var router = Router();
router.get('/', getTrucks);
router.get('/:id', getTruckById);
router.put('/:id', updateTruckById);
router.post('/', createTruck);
router["delete"]('/:id', deleteTruckById);
module.exports = router;