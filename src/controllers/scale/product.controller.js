const { response, request } = require('express');
const Product = require('../../models/scale/product.model');


const getProducts = async (req = request, res = response) => {
    try {
        const products = await Product.findAll({ where: { enabled: true } });
        res.status(200).json({
            msg: 'Lista de Productos',
            products
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


const getProductById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (product != null) {
            res.status(200).json({
                msg: 'Información del producto',
                product
            });
        } else {
            console.log('Not found');
            res.status(200).json({
                msg: 'Producto no encontrado, verifique id'
            });
        }

    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` });
    }
}


const updateProductById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { productName, enable } = req.body;
        const productUpdated = await Product.findByPk(id);

        if (productUpdated != null) {
            console.log('found');
            productUpdated.productName = productName;
            productUpdated.enable = enable;

            await productUpdated.save();

            res.status(200).json({
                msg: 'Origen actualizado',
                productUpdated
            });
        } else {
            console.log('Not found');
            res.status(200).json({
                msg: 'Producto no encontrado, verifique id'
            });
        }

    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` });
    }
}

const deleteProductById = async (req = request, res = response) => {
    try {
        const { id } = req.params

        const deletedProduct = await Product.findByPk(id);
        if (deletedProduct != null) {
            deletedProduct.enabled = false;

            await deletedProduct.save();

            res.status(202).json({
                msg: 'Producto eliminado Id:' + id
            });
        } else {
            res.status(404).json({
                msg: 'Producto no encontrado, verifique el Id ingresado'
            })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}



const createProduct = async (req = request, res = response) => {
    try {
        const { productName } = req.body
        const newProduct = await Product.create({
            productName
        });

        res.status(201).json({
            msg: 'Origen creado satisfactoriamente!',
            newProduct
        })
    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` })
    }

}



module.exports = {
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    createProduct
}