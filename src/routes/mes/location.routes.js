const { Router } = require('express');


// Funciones desde el controlador
const {
    getLocation,
    createNewLocation,
    updateLocationById,
    deleteLocationById
} = require('../../controllers/mes/location.controller');


const router = Router();


//Routes production
router.get('/', getLocation);

router.get('/:_id', getLocation);

router.post('/', createNewLocation);

router.put('/:_id', updateLocationById);

router.delete('/:_id', deleteLocationById);



module.exports = router;