
const { Router } = require('express');

const { getRegisters,
    getRegisterById,
    getLastRegisterByNumberPlate,
    updateRegisterById,
    deleteRegisterById,
    createRegister } = require('../../controllers/scale/register.controller');

const router = Router();


router.get('/', getRegisters);

router.get('/:id', getRegisterById);

router.get('/truck/:numberPlate', getLastRegisterByNumberPlate);

router.put('/:id', updateRegisterById);

router.post('/', createRegister);

router.delete('/:id', deleteRegisterById);




module.exports = router;