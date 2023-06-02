
const { Router } = require('express');

const { validateJWT } = require('../../middlewares/validateJWT')
const baseAuth = require('../baseAuth');



const { getClients,
    getClientById,
    updateClientById,
    deleteClientById,
    createClient } = require('../../controllers/scale/client.controller');


const { CLIENT: NAME_MODULE } = require('../../constants/module_names');

const authenticate = baseAuth(NAME_MODULE);

const router = Router();


router.get('/', authenticate, getClients);

router.get('/:id', authenticate, getClientById);

router.put('/:id', authenticate, updateClientById);

router.post('/', authenticate, createClient);

router.delete('/:id', authenticate, deleteClientById);




module.exports = router;