
const { Router } = require('express');
const baseAuth = require('../baseAuth');

const { getTrucks,
    getTruckById,
    updateTruckById,
    deleteTruckById,
    createTruck } = require('../../controllers/scale/truck.controller');

const { TRUCK: NAME_MODULE } = require('../../constants/module_names');

const authenticate = baseAuth(NAME_MODULE);
    
const router = Router();


router.get('/', authenticate, getTrucks);

router.get('/:id', authenticate, getTruckById);

router.put('/:id', authenticate, updateTruckById);

router.post('/', authenticate, createTruck);

router.delete('/:id', authenticate, deleteTruckById);




module.exports = router;