
const { Router } = require('express');




const { getDestinations,
    getDestinationById,
    updateDestinationById,
    deleteDestinationById,
    createDestination } = require('../../controllers/scale/destination.controller');

const router = Router();


router.get('/', getDestinations);

router.get('/:id', getDestinationById);

router.put('/:id', updateDestinationById);

router.post('/', createDestination);

router.delete('/:id', deleteDestinationById);




module.exports = router;