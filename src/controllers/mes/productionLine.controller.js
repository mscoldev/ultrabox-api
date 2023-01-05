const { response, request } = require("express");
const ProductionLine = require("../../models/productionLine.model");


const getProductionLines = async (req = request, res = response) => {
    try {
        const productionLines = await ProductionLine.find();
        res.status(200).json({
            msg: 'Lineas de producción',
            productionLines
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const createProductionLine = async (req = request, res = response) => {
    try {
        const body = req.body;
        const productionLine = new ProductionLine(body);

        const productionLineSaved = await productionLine.save();

        res.status(201).json({
            msg: 'Linea de producción creada',
            productionLineSaved
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}


const getProductionLineById = async (req = request, res = response) => {
    try {
        const productionLine = await ProductionLine.findById(req.params._id);
        if (productionLine != null) {
            res.status(200).json({
                msg: 'Linea de producción por Id',
                productionLine
            });
        } else {
            res.status(404).json({
                msg: 'Linea de produccion no encontrada'
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const updateProductionLineById = async (req = request, res = response) => {
    try {
        const paramsId = req.params._id;
        const body = req.body;
        const updatedProductionLine = await ProductionLine.findByIdAndUpdate(paramsId, body, { new: true });
        if (updatedProductionLine != null) {
            res.status(200).json({
                msg: 'Linea de produccion actualizada por Id',
                updatedProductionLine
            });
        } else {
            res.status(404).json({
                msg: 'Id de Linea de produccion no econtrado'
            })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }

}

const deleteProductionLineById = async (req = request, res = response) => {
    try {
        const paramsId = req.params._id;
        const body = { deleted: true }
        const deletedProductionLine = await ProductionLine.findByIdAndUpdate(paramsId, body);
        if (deletedProductionLine != null) {
            res.status(202).json({
                msg: 'Linea de produccion eliminada Id:' + paramsId
            });
        } else {
            res.status(404).json({
                msg: 'Linea de produccion no encontrada, verifique los datos'
            })
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getProductionLines,
    createProductionLine,
    getProductionLineById,
    updateProductionLineById,
    deleteProductionLineById
}