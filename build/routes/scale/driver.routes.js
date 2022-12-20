"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../../middlewares/validateJWT'),
    validateJWT = _require2.validateJWT;

var _require3 = require('../../controllers/scale/driver.controller'),
    getDrivers = _require3.getDrivers,
    getDriverById = _require3.getDriverById,
    updateDriverById = _require3.updateDriverById,
    deleteDriverById = _require3.deleteDriverById,
    createDriver = _require3.createDriver;

var router = Router();
router.get('/', getDrivers);
router.get('/:id', getDriverById);
router.put('/:id', [validateJWT], updateDriverById);
router.post('/', [validateJWT], createDriver);
router["delete"]('/:id', [validateJWT], deleteDriverById);
module.exports = router;