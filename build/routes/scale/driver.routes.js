"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../../controllers/scale/driver.controller'),
    getDrivers = _require2.getDrivers,
    getDriverById = _require2.getDriverById,
    updateDriverById = _require2.updateDriverById,
    deleteDriverById = _require2.deleteDriverById,
    createDriver = _require2.createDriver;

var router = Router();
router.get('/', getDrivers);
router.get('/:id', getDriverById);
router.put('/:id', updateDriverById);
router.post('/', createDriver);
router["delete"]('/:id', deleteDriverById);
module.exports = router;