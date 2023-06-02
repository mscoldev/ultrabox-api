const { Router } = require('express');
const baseAuth = require('../baseAuth');

// Funciones desde el controlador
const {
    getProductionLines,
    getProductionLineById,
    updateProductionLineById,
    createProductionLine,
    deleteProductionLineById,
    getNameProdLinesByIdController
} = require('../../controllers/mes/productionLine.controller');

const { PRODUCTION_LINE: NAME_MODULE } = require('../../constants/module_names');

const authenticate = baseAuth(NAME_MODULE);

const router = Router();


//Routes production
router.get('/', authenticate, getProductionLines);

router.get('/:_id', authenticate, getProductionLineById);
router.get('/name/:idc', authenticate, getNameProdLinesByIdController);

router.post('/', authenticate, createProductionLine);

router.put('/:_id', authenticate, updateProductionLineById);

router.delete('/:_id', authenticate, deleteProductionLineById);



module.exports = router;