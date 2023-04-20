"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../../middlewares/validateJWT'),
    validateJWT = _require2.validateJWT;

var _require3 = require('../../controllers/scale/client.controller'),
    getClients = _require3.getClients,
    getClientById = _require3.getClientById,
    updateClientById = _require3.updateClientById,
    deleteClientById = _require3.deleteClientById,
    createClient = _require3.createClient;

var router = Router();
router.get('/', getClients);
router.get('/:id', getClientById);
router.put('/:id', updateClientById);
router.post('/', createClient);
router["delete"]('/:id', deleteClientById);
module.exports = router;
//# sourceMappingURL=client.routes.js.map