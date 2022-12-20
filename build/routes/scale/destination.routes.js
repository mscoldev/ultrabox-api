"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../../middlewares/validateJWT'),
    validateJWT = _require2.validateJWT;

var _require3 = require('../../controllers/scale/destination.controller'),
    getDestinations = _require3.getDestinations,
    getDestinationById = _require3.getDestinationById,
    updateDestinationById = _require3.updateDestinationById,
    deleteDestinationById = _require3.deleteDestinationById,
    createDestination = _require3.createDestination;

var router = Router();
router.get('/', getDestinations);
router.get('/:id', getDestinationById);
router.put('/:id', [validateJWT], updateDestinationById);
router.post('/', [validateJWT], createDestination);
router["delete"]('/:id', [validateJWT], deleteDestinationById);
module.exports = router;