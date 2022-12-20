"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../../middlewares/validateJWT'),
    validateJWT = _require2.validateJWT;

var _require3 = require('../../controllers/scale/register.controller'),
    getRegisters = _require3.getRegisters,
    getRegisterById = _require3.getRegisterById,
    getLastRegisterByNumberPlate = _require3.getLastRegisterByNumberPlate,
    updateRegisterById = _require3.updateRegisterById,
    deleteRegisterById = _require3.deleteRegisterById,
    createRegister = _require3.createRegister;

var router = Router();
router.get('/', getRegisters);
router.get('/:id', getRegisterById);
router.get('/truck/:numberPlate', getLastRegisterByNumberPlate);
router.put('/:id', [validateJWT], updateRegisterById);
router.post('/', [validateJWT], createRegister);
router["delete"]('/:id', [validateJWT], deleteRegisterById);
module.exports = router;