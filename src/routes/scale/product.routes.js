
const { Router } = require('express');

const { getProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    createProduct } = require('../../controllers/scale/product.controller');

const router = Router();


router.get('/', getProducts);

router.get('/:id', getProductById);

router.put('/:id', updateProductById);

router.post('/', createProduct);

router.delete('/:id', deleteProductById);




module.exports = router;