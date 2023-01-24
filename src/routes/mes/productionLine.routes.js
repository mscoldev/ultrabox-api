const { Router } = require('express');


// Funciones desde el controlador
const {
    getProductionLines,
    getProductionLineById,
    updateProductionLineById,
    createProductionLine,
    deleteProductionLineById,
    getNameProdLinesByIdController
} = require('../../controllers/mes/productionLine.controller');


const router = Router();


//Routes production
router.get('/', getProductionLines);

router.get('/:_id', getProductionLineById);
router.get('/name/:idc', getNameProdLinesByIdController);

router.post('/', createProductionLine);

router.put('/:_id', updateProductionLineById);

router.delete('/:_id', deleteProductionLineById);



module.exports = router;