"use strict";

var _require = require('express'),
    Router = _require.Router; // Funciones desde el controlador


var _require2 = require('../../controllers/mes/productionLine.controller'),
    getProductionLines = _require2.getProductionLines,
    getProductionLineById = _require2.getProductionLineById,
    updateProductionLineById = _require2.updateProductionLineById,
    createProductionLine = _require2.createProductionLine,
    deleteProductionLineById = _require2.deleteProductionLineById;

var router = Router(); //Routes production

router.get('/', getProductionLines);
router.get('/:_id', getProductionLineById);
router.post('/', createProductionLine);
router.put('/:_id', updateProductionLineById);
router["delete"]('/:_id', deleteProductionLineById);
module.exports = router;