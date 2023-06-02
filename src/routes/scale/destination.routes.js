
const { Router } = require('express');
const baseAuth = require('../baseAuth');



const { getDestinations,
    getDestinationById,
    updateDestinationById,
    deleteDestinationById,
    createDestination } = require('../../controllers/scale/destination.controller');


const { DESTINATION: NAME_MODULE } = require('../../constants/module_names');

const authenticate = baseAuth(NAME_MODULE);

const router = Router();


router.get('/', authenticate, getDestinations);

router.get('/:id', authenticate, getDestinationById);

router.put('/:id', authenticate, updateDestinationById);

router.post('/', authenticate, createDestination);

router.delete('/:id', authenticate, deleteDestinationById);




module.exports = router;