
const { Router } = require('express');

const { validateJWT } = require('../../middlewares/validateJWT');

const { getTrucks,
    getTruckById,
    updateTruckById,
    deleteTruckById,
    createTruck } = require('../../controllers/scale/truck.controller');

const router = Router();


router.get('/', getTrucks);

router.get('/:id', getTruckById);

router.put('/:id', [validateJWT], updateTruckById);

router.post('/', [validateJWT], createTruck);

router.delete('/:id', [validateJWT], deleteTruckById);




module.exports = router;