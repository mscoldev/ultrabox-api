
const { Router } = require('express');

const { validateJWT } = require('../../middlewares/validateJWT')



const { getClients,
    getClientById,
    updateClientById,
    deleteClientById,
    createClient } = require('../../controllers/scale/client.controller');

const router = Router();


router.get('/', getClients);

router.get('/:id', getClientById);

router.put('/:id', updateClientById);

router.post('/', createClient);

router.delete('/:id', deleteClientById);




module.exports = router;