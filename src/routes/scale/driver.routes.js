
const { Router } = require('express');

const { validateJWT } = require('../../middlewares/validateJWT');


const { getDrivers,
    getDriverById,
    updateDriverById,
    deleteDriverById,
    createDriver } = require('../../controllers/scale/driver.controller');

const router = Router();


router.get('/', getDrivers);

router.get('/:id', getDriverById);

router.put('/:id', [validateJWT], updateDriverById);

router.post('/', [validateJWT], createDriver);

router.delete('/:id', [validateJWT], deleteDriverById);




module.exports = router;