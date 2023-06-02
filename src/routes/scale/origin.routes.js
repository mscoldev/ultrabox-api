
const { Router } = require('express');
const baseAuth = require('../baseAuth');

const { getOrigins,
    getOriginById,
    updateOriginById,
    deleteOriginById,
    createOrigin } = require('../../controllers/scale/origin.controller');

const { ORIGIN: NAME_MODULE } = require('../../constants/module_names');

const authenticate = baseAuth(NAME_MODULE);

const router = Router();


router.get('/', authenticate, getOrigins);

router.get('/:id', authenticate, getOriginById);

router.put('/:id', authenticate, updateOriginById);

router.post('/', authenticate, createOrigin);

router.delete('/:id', authenticate, deleteOriginById);




module.exports = router;