const { response, request } = require("express");
const Production = require("../../models/production.model");


const getProductions = async (req = request, res = response) => {
    try {
        const productions = await Production.find();
        res.status(200).json({
            msg: 'Lista de producciones',
            productions
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const createProduction = async (req = request, res = response) => {
    try {
        const body = req.body;
        const production = new Production(body);

        const productionSaved = await production.save();

        res.status(201).json({
            msg: 'Producción Creada',
            productionSaved
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}


const getProductionById = async (req = request, res = response) => {
    try {
        const production = await Production.findById(req.params._id);
        if (production != null) {
            res.status(200).json({
                msg: 'Producción por Id',
                production
            });
        } else {
            res.status(404).json({
                msg: 'Producción no encontrada, verifique el Id ingresado'
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const updateProductionById = async (req = request, res = response) => {
    try {
        const paramsId = req.params._id;
        const body = req.body;
        const updatedProduction = await Production.findByIdAndUpdate(paramsId, body, { new: true });
        if (updatedProduction != null) {
            res.status(200).json({
                msg: 'Producción actualizada segun Id',
                updatedProduction
            });
        } else {
            res.status(404).json({
                msg: 'Id de Producción no encontrado'
            })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }

}

const deleteProductionById = async (req = request, res = response) => {
    try {
        const paramsId = req.params._id;
        const body = { deleted: true }
        const deletedProduction = await Production.findByIdAndUpdate(paramsId, body);
        if (deletedProduction != null) {
            res.status(202).json({
                msg: 'Material eliminado Id:' + paramsId
            });
        } else {
            res.status(404).json({
                msg: 'Material no encontrado, verifique el Id ingresado'
            })
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getProductions,
    createProduction,
    getProductionById,
    updateProductionById,
    deleteProductionById
}