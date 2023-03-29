const { response, request } = require("express");
const boom = require('@hapi/boom');
const { Types } = require('mongoose');
const Acceptance = require("../../models/projects/acceptance.model");



const getSchedule = async(req = request, res = response, next) => {
    try {
        const schedule = await Schedule.find()
            .populate([{
                path: '_idRecipe',
                populate: {
                    path: 'ingredients._idMaterial'
                }
            }, {
                path: '_idRecipe',
                populate: {
                    path: 'ingredients._idLocation'
                }
            }])
            .populate({ path: '_idProductionLine' })
            .populate({ path: '_idUser', select: { username: 1 } }).exec()


        if (schedule.length !== 0) {
            res.status(200).json({
                msg: 'Lista de Programaciones',
                schedule
            })
        } else {
            throw boom.notFound('Oops!, ubicaciones no encontradas')
        }

    } catch (err) {
        next(err);
    }
}

const getAcceptanceById = async(req = request, res = response, next) => {
    try {
        const _id = Types.ObjectId(req.params._id);
        const acceptance = await Acceptance.findById({ _id })
        if (acceptance.length !== 0) {
            res.status(200).json({
                msg: 'Acta de aceptación',
                acceptance
            })
        } else {
            throw boom.notFound('Oops!, no se encontraron actas de fin de proyecto')
        }

    } catch (err) {
        next(err);
    }
}

const setAcceptance = async(req = request, res = response, next) => {
    try {
        const body = req.body
        const newAcceptance = new Acceptance(body);
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

const JSONataExpression = async(dataPromise) => {
    const queryJSONata = `[$.{"id":_id,"name":name,"erp_code":erp_code,"id_controller":id_controller,
        "productionLineUse":[productionLineUse.$.{"_id":_id,"name":name}],
        "ingredients":[ingredients.$.{"_idIngredient":_id,"_idMaterial":_idMaterial._id,"name":_idMaterial.name,"id_controller":_idMaterial.id_controller,"type":_idMaterial.type,"deleted":_idMaterial.deleted,"qty":qty}]}]`;
    const expression = jsonata(queryJSONata);

    const result = expression.evaluate(dataPromise);
    return result;
}



module.exports = {
    setAcceptance,
    getAcceptanceById
}
