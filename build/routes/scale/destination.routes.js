"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../../controllers/scale/destination.controller'),
    getDestinations = _require2.getDestinations,
    getDestinationById = _require2.getDestinationById,
    updateDestinationById = _require2.updateDestinationById,
    deleteDestinationById = _require2.deleteDestinationById,
    createDestination = _require2.createDestination;

var router = Router();
router.get('/', getDestinations);
router.get('/:id', getDestinationById);
router.put('/:id', updateDestinationById);
router.post('/', createDestination);
router["delete"]('/:id', deleteDestinationById);
module.exports = router;
//# sourceMappingURL=destination.routes.js.map