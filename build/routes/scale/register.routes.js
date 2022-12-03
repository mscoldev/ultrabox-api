"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../../controllers/scale/register.controller'),
    getRegisters = _require2.getRegisters,
    getRegisterById = _require2.getRegisterById,
    updateRegisterById = _require2.updateRegisterById,
    deleteRegisterById = _require2.deleteRegisterById,
    createRegister = _require2.createRegister;

var router = Router();
router.get('/', getRegisters);
router.get('/:id', getRegisterById);
router.put('/:id', updateRegisterById);
router.post('/', createRegister);
router["delete"]('/:id', deleteRegisterById);
module.exports = router;