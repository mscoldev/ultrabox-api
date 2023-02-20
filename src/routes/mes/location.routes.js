const { Router } = require('express');


// Funciones desde el controlador
const {
    getLocation,
} = require('../../controllers/mes/location.controller');


const router = Router();


//Routes production
router.get('/', getLocation);

router.get('/:_id', getLocationById);

router.post('/', getLocation);

router.put('/:_id', getLocation);

router.delete('/:_id', getLocation);



module.exports = router;