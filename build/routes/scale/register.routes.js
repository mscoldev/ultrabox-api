"use strict";

var _require = require('express'),
    Router = _require.Router;

var passport = require('passport');

var _require2 = require('../../controllers/scale/register.controller'),
    getRegisters = _require2.getRegisters,
    getRegisterById = _require2.getRegisterById,
    getLastRegisterByNumberPlate = _require2.getLastRegisterByNumberPlate,
    updateRegisterById = _require2.updateRegisterById,
    deleteRegisterById = _require2.deleteRegisterById,
    createRegister = _require2.createRegister;

var router = Router();
router.get('/', getRegisters);
router.get('/:id', getRegisterById);
router.get('/truck/:numberPlate', getLastRegisterByNumberPlate);
router.put('/:id', [passport.authenticate('jwt', {
  session: false
})], updateRegisterById);
router.post('/', [passport.authenticate('jwt', {
  session: false
})], createRegister);
router["delete"]('/:id', deleteRegisterById);
module.exports = router;
//# sourceMappingURL=register.routes.js.map