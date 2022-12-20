
const { Router } = require('express');

const { validateJWT } = require('../../middlewares/validateJWT');

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

router.put('/:id', [validateJWT], updateRegisterById);

router.post('/', [validateJWT], createRegister);

router.delete('/:id', [validateJWT], deleteRegisterById);




module.exports = router;