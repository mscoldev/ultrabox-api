const { response, request } = require("express");
const boom = require('@hapi/boom');
const { Types } = require('mongoose');
const PjAcceptance = require("../../models/projects/acceptance.model");



const getAcceptanceById = async(req = request, res = response, next) => {
    try {
        const _id = Types.ObjectId(req.params._id);
        const acceptance = await PjAcceptance.findById({ _id }).populate({ path: '_idFiles', model: 'File' })
        console.log({ acceptance });
        if (acceptance != null) {
            res.status(200).json({
                msg: 'Acta de aceptación',
                acceptance
            })
        } else {
            throw boom.notFound(`Oops!, no se encontraron actas de fin de proyecto con _id:${_id}, verifique e intente nuevamente`)
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

const updateScheduleById = async(req = request, res = response, next) => {
    try {
        let body = req.body
        body.dateStart = body.dateStart + " " + body.hourStart;
        body.dateEnd = body.dateEnd + " " + body.hourEnd;

        const _id = Types.ObjectId(req.params._id);
        const updateSchedule = await Schedule.findByIdAndUpdate(_id, body, { new: true });
        if (updateSchedule != null) {
            res.status(200).json({
                msg: 'Programación actualizada',
                updateSchedule
            });
        } else {
            throw boom.notFound('Oops!, programación no encontrada')
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
    getAcceptanceById
}