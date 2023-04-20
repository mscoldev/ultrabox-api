"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../../controllers/scale/product.controller'),
    getProducts = _require2.getProducts,
    getProductById = _require2.getProductById,
    updateProductById = _require2.updateProductById,
    deleteProductById = _require2.deleteProductById,
    createProduct = _require2.createProduct;

var router = Router();
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProductById);
router.post('/', createProduct);
router["delete"]('/:id', deleteProductById);
module.exports = router;
//# sourceMappingURL=product.routes.js.map