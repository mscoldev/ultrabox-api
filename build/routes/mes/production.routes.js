"use strict";

var _require = require('express'),
    Router = _require.Router; // Funciones desde el controlador


var _require2 = require("../../controllers/mes/production.controller"),
    getProductions = _require2.getProductions,
    getProductionById = _require2.getProductionById,
    updateProductionById = _require2.updateProductionById,
    createProduction = _require2.createProduction,
    deleteProductionById = _require2.deleteProductionById;

var router = Router(); //Routes production

router.get('/', getProductions);
router.get('/:_id', getProductionById);
router.post('/', createProduction);
router.put('/:_id', updateProductionById);
router["delete"]('/:_id', deleteProductionById);
module.exports = router;
//# sourceMappingURL=production.routes.js.map