const { response, request } = require("express");
const boom = require('@hapi/boom');
const ProductionLine = require("../../models/productionLine.model");


const getProductionLines = async (req = request, res = response, next) => {
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

const getNameProdLinesByIdController = async (req = request, res = response, next) => {
    const { idc } = req.params
    try {
        const productionLine = await ProductionLine.findOne({ 'id_controller': idc })
        res.status(200).json({
            msg: 'Informacion de linea de produccion',
            productionLine
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


const createProductionLine = async (req = request, res = response, next) => {
    try {
        const body = req.body;

        const validatorUniqueErpCode = await ProductionLine.findOne({
            $or: [
                { erp_code: body.erp_code },
                { name: body.name },
                { id_controller: body.id_controller }
            ]
        })

        console.log({ validatorUniqueErpCode });

        if (!validatorUniqueErpCode) {
            const productionLine = new ProductionLine(body);
            const productionLineSaved = await productionLine.save();
            res.status(201).json({
                message: 'Linea de producción creada',
                productionLineSaved
            })
        } else {
            throw boom.badRequest('Oops!, verifique el Request.Existe por lo menos un registro con name, erp_code o id_controlador registrado. Estos atributos deben ser únicos')
        }

    } catch (err) {
        next(err);
    }

}


const getProductionLineById = async (req = request, res = response, next) => {
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

const updateProductionLineById = async (req = request, res = response, next) => {
    try {
        const _id = req.params._id;
        const body = req.body;
        const updatedProductionLine = await ProductionLine.findByIdAndUpdate(_id, body, { new: true });
        if (updatedProductionLine != null) {
            res.status(200).json({
                message: 'Linea de producción actualizada por Id',
                updatedProductionLine
            });
        } else {

            throw boom.badRequest('Oops!, _id no encontrado. Verifica el registro que deseas actualizar.')
        }
    }
    catch (err) {
        next(err);
    }

}

const deleteProductionLineById = async (req = request, res = response, next) => {
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
    deleteProductionLineById,
    getNameProdLinesByIdController
}