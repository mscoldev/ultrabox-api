const { Router } = require('express');
const baseAuth = require('../baseAuth');

// Funciones desde el controlador
const {
    getProductions,
    getProductionById,
    updateProductionById,
    createProduction,
    deleteProductionById
} = require("../../controllers/mes/production.controller");

const { PRODUCTION: NAME_MODULE } = require('../../constants/module_names');

const authenticate = baseAuth(NAME_MODULE);

const router = Router();


//Routes production
router.get('/', authenticate, getProductions);

router.get('/:_id', authenticate, getProductionById);

router.post('/', authenticate, createProduction);

router.put('/:_id', authenticate, updateProductionById);

router.delete('/:_id', authenticate, deleteProductionById);



module.exports = router;