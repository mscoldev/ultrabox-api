const { response, request } = require("express");
const boom = require('@hapi/boom');
const { Types } = require('mongoose');
const Location = require("../../models/mes/location.model");



const getLocation = async (req = request, res = response, next) => {
    try {
        const location = await Location.find();
        if (location.length !== 0) {
            res.status(200).json({
                msg: 'Lista de ubicaciones',
                location
            })
        } else {
            throw boom.notFound('Oops!, ubicaciones no encontradas')
        }

    } catch (err) {
        next(err);
    }
}

const createNewLocation = async (req = request, res = response, next) => {

    const body = req.body
    try {
        const newLocation = new Location(body);
        const location = await newLocation.save();

        res.status(201).json({
            message: 'Nueva ubicación creada con exito!',
            location
        })
    } catch (err) {
        next(err);
    }
}

const updateLocationById = async (req = request, res = response, next) => {
    try {
        const _id = req.params._id;
        const body = req.body;
        const updateLocation = await Location.findByIdAndUpdate(_id, body, { new: true });
        if (updateLocation != null) {
            res.status(200).json({
                msg: 'Linea de produccion actualizada por Id',
                updateLocation
            });
        } else {
            throw boom.notFound('Oops!, ubicacion no encontrada')
        }
    }
    catch (err) {
        next(err);
    }

}

const deleteLocationById = async (req = request, res = response, next) => {
    try {
        const _id = Types.ObjectId(req.params._id);
        const deletedLocation = await Location.findByIdAndDelete(_id);
        if (deletedLocation != null) {
            res.status(202).json({
                msg: 'Linea de producción eliminada Id:' + _id
            });
        } else {
            throw boom.notFound('Oops!, ubicación no encontrada, verifique el id')
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getLocation,
    createNewLocation,
    updateLocationById,
    deleteLocationById
}