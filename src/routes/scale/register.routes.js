const { Router } = require('express');
const baseAuth = require('../baseAuth');

const { getRegisters,
    getRegisterById,
    getLastRegisterByNumberPlate,
    updateRegisterById,
    deleteRegisterById,
    createRegister } = require('../../controllers/scale/register.controller');

const { REGISTER: NAME_MODULE } = require('../../constants/module_names');

const authenticate = baseAuth(NAME_MODULE);

const router = Router();


router.get('/', authenticate, getRegisters);

router.get('/:id', authenticate, getRegisterById);

router.get('/truck/:numberPlate', authenticate, getLastRegisterByNumberPlate);

router.put('/:id', authenticate, updateRegisterById);

router.post('/', authenticate, createRegister);

router.delete('/:id', authenticate, deleteRegisterById);




module.exports = router;