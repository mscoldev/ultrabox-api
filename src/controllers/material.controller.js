const { response, request } = require('express');
const Material = require('../models/material.model')


const getMaterials = async (req = request, res = response) => {
    try {
        const materials = await Material.find({ "deleted": false });
        res.status(200).json({
            msg: 'List of materials',
            materials
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const getMaterialsById = async (req = request, res = response) => {
    const material = await Material.findById(req.params.materialId);
    if (material != null) {
        res.status(200).json({
            msg: 'Material por Id',
            material
        });
    } else {
        res.status(404).json({
            msg: 'Material no encontrado, verifique el Id ingresado'
        })
    }
}

const updateMaterialById = async (req = request, res = response) => {
    try {
        const paramsId = req.params.materialId;
        const body = req.body;
        const updatedMaterial = await Material.findByIdAndUpdate(paramsId, body, { new: true });
        if (updatedMaterial != null) {
            res.status(200).json({
                msg: 'Material actualizado por Id',
                updatedMaterial
            });
        } else {
            res.status(404).json({
                msg: 'Material no encontrado, verifique el Id ingresado'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const deleteMaterialById = async (req = request, res = response) => {
    try {
        const paramsId = req.params.materialId;
        const body = { deleted: true }
        const deletedMaterial = await Material.findByIdAndUpdate(paramsId, body);
        if (deletedMaterial != null) {
            res.status(200).json({
                msg: 'Material eliminado Id:' + paramsId
            });
        } else {
            res.status(404).json({
                msg: 'Material no encontrado, verifique el Id ingresado'
            })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}



const createMaterial = async (req = request, res = response) => {
    //TODO: Usar desestructuracion de objetos
    try {
        const body = req.body;
        console.log(body);
        const material = new Material(body);

        const materialSaved = await material.save();

        res.status(201).json({
            msg: 'Material created successfully',
            materialSaved
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}



module.exports = { createMaterial, getMaterials, getMaterialsById, updateMaterialById, deleteMaterialById }