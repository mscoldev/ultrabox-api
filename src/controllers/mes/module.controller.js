const { response, request } = require('express');
const boom = require('@hapi/boom');
const { Types } = require('mongoose');
const Module = require("../../models/module.model");


const getModules = async (req = request, res = response) => {
    try {
        const modules = await Module.find({ "deleted": false });
        res.status(200).json({
            msg: 'List of Modules',
            modules
        })
    } catch (err) {
        next(err);
    }
}

const getChildrenModuleById = async (req = request, res = response) => {
    const modules = await Module.find({child: req.params._id, deleted: false});
    if (modules != null) {
        res.status(200).json({
            msg: 'Child Module por Id',
            module: req.params._id,
            modules
        });
    } else {
        res.status(404).json({
            msg: 'Modulos no encontrado, verifique el Id ingresado'
        })
    }
}

const updateModuleById = async (req = request, res = response) => {
    try {
        const paramsId = req.params._id;
        const body = req.body;
        const updatedModule = await Module.findByIdAndUpdate(paramsId, body, { new: true });
        if (updatedModule != null) {
            res.status(200).json({
                msg: 'Modulo actualizado por Id',
                updatedModule
            });
        } else {
            res.status(404).json({
                msg: 'Modulo no encontrado, verifique el Id ingresado'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const deleteModuleById = async (req = request, res = response) => {
    try {
        const paramsId = req.params._id;
        console.log(paramsId);
        const body = { deleted: true }
        const deletedModule = await Module.findByIdAndUpdate(paramsId, body);
        console.log(deletedModule);
        if (deletedModule != null) {
            res.status(202).json({
                msg: 'Modulo eliminado Id:' + paramsId
            });
        } else {
            res.status(404).json({
                msg: 'Modulo no encontrado, verifique el Id ingresado'
            })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const createModule = async (req = request, res = response) => {
    //TODO: Usar desestructuracion de objetos
    try {
        const body = req.body;
        console.log(body);
        const module = new Module(body);

        const moduleSaved = await module.save();

        res.status(201).json({
            msg: 'Module created successfully',
            moduleSaved
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}



module.exports = { createModule, getModules, updateModuleById, getChildrenModuleById, deleteModuleById }