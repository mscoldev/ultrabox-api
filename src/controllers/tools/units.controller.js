const { response, request } = require("express");
const { Types } = require('mongoose')
const boom = require('@hapi/boom');
const Unit = require("../../models/tools/unit");



const getUnits = async(req = request, res = response, next) => {
    try {
        const units = await Unit.find();
        if (units.length !== 0) {
            res.status(200).json({
                message: 'Lista de unidades',
                units
            })
        } else {
            throw boom.notFound('Oops!, no hay unidades registradas aun!')
        }

    } catch (err) {
        next(err);
    }
}

const createUnit = async(req = request, res = response, next) => {
    const { name, symbol } = req.body
    try {
        const newUnit = new Unit({ name, symbol });
        const unit = await newUnit.save();

        res.status(201).json({
            message: 'Nueva unidad de medida creada con exito!',
            unit
        })
    } catch (err) {
        next(err);
    }
}

const updateUnitById = async(req = request, res = response, next) => {
    try {
        const _id = Types.ObjectId(req.params._id);
        const { name, symbol } = req.body;
        const unit = await Unit.findByIdAndUpdate(_id, { name, symbol }, { new: true });
        if (unit != null) {
            res.status(200).json({
                msg: 'Unidad de medida actualizada',
                unit
            });
        } else {
            throw boom.notFound('Oops!, unidad no existe, verifique el id de la unidad.')
        }
    } catch (err) {
        next(err);
    }

}

const deleteUnitById = async(req = request, res = response, next) => {
    try {
        const _id = Types.ObjectId(req.params._id);
        const deletedUnit = await Unit.findByIdAndDelete(_id);
        if (deletedUnit != null) {
            res.status(202).json({
                msg: 'Unidad de medición eliminada Id:' + _id
            });
        } else {
            throw boom.notFound('Oops!, unidad de medición  no encontrada, verifique el id')
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getUnits,
    createUnit,
    updateUnitById,
    deleteUnitById
}