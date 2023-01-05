
const { Router } = require('express');

const { validateJWT } = require('../../middlewares/validateJWT');


const { getDestinations,
    getDestinationById,
    updateDestinationById,
    deleteDestinationById,
    createDestination } = require('../../controllers/scale/destination.controller');

const router = Router();


router.get('/', getDestinations);

router.get('/:id', getDestinationById);

router.put('/:id', [validateJWT], updateDestinationById);

router.post('/', [validateJWT], createDestination);

router.delete('/:id', [validateJWT], deleteDestinationById);




module.exports = router;