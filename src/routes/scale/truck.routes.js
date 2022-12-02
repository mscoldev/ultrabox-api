
const { Router } = require('express');

const { getTrucks,
    getTruckById,
    updateTruckById,
    deleteTruckById,
    createTruck } = require('../../controllers/scale/truck.controller');

const router = Router();


router.get('/', getTrucks);

router.get('/:id', getTruckById);

router.put('/:id', updateTruckById);

router.post('/', createTruck);

router.delete('/:id', deleteTruckById);




module.exports = router;