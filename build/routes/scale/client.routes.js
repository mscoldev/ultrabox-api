"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../../controllers/scale/client.controller'),
    getClients = _require2.getClients,
    getClientById = _require2.getClientById,
    updateClientById = _require2.updateClientById,
    deleteClientById = _require2.deleteClientById,
    createClient = _require2.createClient;

var router = Router();
router.get('/', getClients);
router.get('/:id', getClientById);
router.put('/:id', updateClientById);
router.post('/', createClient);
router["delete"]('/:id', deleteClientById);
module.exports = router;