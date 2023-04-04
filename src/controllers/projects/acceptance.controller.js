const { response, request } = require("express");
const boom = require('@hapi/boom');
const { Types } = require('mongoose');
const PjAcceptance = require("../../models/projects/acceptance.model");
const { and } = require("sequelize");



const getAcceptanceById = async(req = request, res = response, next) => {
    try {
        const { _id, _codeProjectERP } = req.query;
        if (_id == undefined & _codeProjectERP == undefined) {
            throw boom.badRequest('Debe definir mínimo un parámetro de consulta: _id o _codeProjectERP')
        } else {
            //*Aquí buscamos en la base de datos por cualquiera de los dos parámetros.
            const acceptance = await PjAcceptance
                .findOne({ $or: [{ _codeProjectERP }, { _id }] })
                .populate({ path: '_idFiles', model: 'File' })
            if (acceptance != null) {
                res.status(200).json({
                    msg: 'Acta de aceptación',
                    acceptance
                })
            } else {
                throw boom.notFound(`Oops!, no se encontraron actas con alguno de los parámetros de búsqueda ingresados.`)
            }
        }
    } catch (err) {
        next(err);
    }
}



const setAcceptance = async(req = request, res = response, next) => {
    try {
        const body = req.body
        const newAcceptance = new PjAcceptance(body);
        const acceptanceSaved = await newAcceptance.save();
        console.log(acceptanceSaved);
        res.status(200).json({
            msg: 'Nueva acta de aceptacion de proyecto almacenada',
            acceptanceSaved
        });

    } catch (err) {
        next(err);
    }
}



const updateAcceptanceById = async(req = request, res = response, next) => {
    try {
        const body = req.body
        const _id = Types.ObjectId(req.params._id);

        const updateAcceptance = await PjAcceptance
            .findByIdAndUpdate(_id, body, { new: true });

        if (updateAcceptance != null) {
            res.status(200).json({
                msg: 'Acta actualizada',
                updateAcceptance
            });
        } else {
            throw boom.notFound(`Oops!, acta con _id:${_id}, no encontrada`)
        }
    } catch (err) {
        next(err);
    }

}

const deleteScheduleById = async(req = request, res = response, next) => {
    try {
        const _id = Types.ObjectId(req.params._id);
        const deletedSchedule = await Schedule.findByIdAndDelete(_id);
        if (deletedSchedule != null) {
            res.status(202).json({
                msg: `Plan eliminado con exito _id:${_id}`
            });
        } else {
            throw boom.notFound('Oops!, plan no encontrado, verifique el id')
        }
    } catch (err) {
        next(err);
    }
}



module.exports = {
    setAcceptance,
    getAcceptanceById,
    updateAcceptanceById
}