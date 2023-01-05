
const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../../middlewares/validateJWT');


const { getProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    createProduct } = require('../../controllers/scale/product.controller');

const router = Router();


router.get('/', getProducts);

router.get('/:id', getProductById);

router.put('/:id', [validateJWT], updateProductById);

router.post('/', [validateJWT], createProduct);

router.delete('/:id', [validateJWT], deleteProductById);




module.exports = router;