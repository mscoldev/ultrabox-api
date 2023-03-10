const { Router } = require('express');
const passport = require('passport');


//*Funciones desde el controlador
const {
    getUnits,
    createUnit,
    updateUnitById,
    deleteUnitById
} = require('../../controllers/tools/units.controller');



//*Importación de Router express
const router = Router();


//*Rutas necesarias


router.get('/units', getUnits);
router.post('/unit', createUnit);
router.put('/unit/:_id', updateUnitById);
router.delete('/unit/:_id', deleteUnitById);


module.exports = router;