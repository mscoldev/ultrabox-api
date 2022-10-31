const { Router } = require('express');

// Funciones desde el controlador
const {
    getProductions,
    getProductionById,
    updateProductionById,
    createProduction,
    deleteProductionById
} = require('../controllers/production.controller');


const router = Router();


//Routes production
router.get('/', getProductions);

router.get('/:id', getProductionById);

router.post('/', createProduction);

router.put('/:id', updateProductionById);

router.delete('/:id', deleteProductionById);



module.exports = router;