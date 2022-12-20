"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('express-validator'),
    check = _require2.check;

var _require3 = require('../../middlewares/validateJWT'),
    validateJWT = _require3.validateJWT;

var _require4 = require('../../controllers/scale/product.controller'),
    getProducts = _require4.getProducts,
    getProductById = _require4.getProductById,
    updateProductById = _require4.updateProductById,
    deleteProductById = _require4.deleteProductById,
    createProduct = _require4.createProduct;

var router = Router();
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', [validateJWT], updateProductById);
router.post('/', [validateJWT], createProduct);
router["delete"]('/:id', [validateJWT], deleteProductById);
module.exports = router;