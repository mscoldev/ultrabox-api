
const { Router } = require('express');

const { getDrivers,
    getDriverById,
    updateDriverById,
    deleteDriverById,
    createDriver } = require('../../controllers/scale/driver.controller');

const router = Router();


router.get('/', getDrivers);

router.get('/:id', getDriverById);

router.put('/:id', updateDriverById);

router.post('/', createDriver);

router.delete('/:id', deleteDriverById);




module.exports = router;