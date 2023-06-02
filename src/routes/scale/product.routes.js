
const { Router } = require('express');
const baseAuth = require('../baseAuth');

const { getProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    createProduct } = require('../../controllers/scale/product.controller');

const { PRODUCT: NAME_MODULE } = require('../../constants/module_names');

const authenticate = baseAuth(NAME_MODULE);

const router = Router();


router.get('/', authenticate, getProducts);

router.get('/:id', authenticate, getProductById);

router.put('/:id', authenticate, updateProductById);

router.post('/', authenticate, createProduct);

router.delete('/:id', authenticate, deleteProductById);




module.exports = router;