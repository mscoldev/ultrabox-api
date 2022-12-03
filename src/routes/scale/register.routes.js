
const { Router } = require('express');

const { getRegisters,
    getRegisterById,
    updateRegisterById,
    deleteRegisterById,
    createRegister } = require('../../controllers/scale/register.controller');

const router = Router();


router.get('/', getRegisters);

router.get('/:id', getRegisterById);

router.put('/:id', updateRegisterById);

router.post('/', createRegister);

router.delete('/:id', deleteRegisterById);




module.exports = router;