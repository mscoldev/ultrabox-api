
const { Router } = require('express');
const baseAuth = require('../baseAuth');

const { getDrivers,
    getDriverById,
    updateDriverById,
    deleteDriverById,
    createDriver } = require('../../controllers/scale/driver.controller');

const { DRIVER: NAME_MODULE } = require('../../constants/module_names');

const authenticate = baseAuth(NAME_MODULE);

const router = Router();


router.get('/', authenticate, getDrivers);

router.get('/:id', authenticate, getDriverById);

router.put('/:id', authenticate, updateDriverById);

router.post('/', authenticate, createDriver);

router.delete('/:id', authenticate, deleteDriverById);




module.exports = router;