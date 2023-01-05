const { Router } = require('express');


// Funciones desde el controlador
const {
    getProductions,
    getProductionById,
    updateProductionById,
    createProduction,
    deleteProductionById
} = require("../../controllers/mes/production.controller");


const router = Router();


//Routes production
router.get('/', getProductions);

router.get('/:_id', getProductionById);

router.post('/', createProduction);

router.put('/:_id', updateProductionById);

router.delete('/:_id', deleteProductionById);



module.exports = router;