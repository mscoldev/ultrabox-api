const { Router } = require('express');
const baseAuth = require('../baseAuth')

// Funciones desde el controlador
const {
    getLocation,
    createNewLocation,
    updateLocationById,
    deleteLocationById
} = require('../../controllers/mes/location.controller');
const { LOCATION: NAME_MODULE } = require('../../constants/module_names');

const router = Router();

const authenticate = baseAuth(NAME_MODULE);

//Routes production
router.get('/', authenticate, getLocation);

router.get('/:_id', authenticate, getLocation);

router.post('/', authenticate, createNewLocation);

router.put('/:_id', authenticate, updateLocationById);

router.delete('/:_id', authenticate, deleteLocationById);



module.exports = router;