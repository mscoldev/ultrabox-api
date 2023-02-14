const { Router } = require('express');
const passport = require('passport');

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

router.put('/:id', [
    passport.authenticate('jwt', { session: false })
], updateRegisterById);

router.post('/', [
    passport.authenticate('jwt', { session: false })
], createRegister);

router.delete('/:id', deleteRegisterById);




module.exports = router;