const { response, request } = require('express');
const Material = require('../models/material.model')


const getMaterials = async (req = request, res = response) => {
    const materials = await Material.find();
    res.status(200).json({
        msg: 'Lista de recetas',
        materials
    })
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
    const paramsId = req.params.materialId;
    const body = req.body;
    const updatedMaterial = await Material.findByIdAndUpdate(paramsId, body, { new: true });
    if (updatedMaterial != null) {
        res.status(200).json({
            msg: 'Material por Id',
            updatedMaterial
        });
    } else {
        res.status(404).json({
            msg: 'Material no encontrado, verifique el Id ingresado'
        })
    }
}

const deleteMaterialById = async (req = request, res = response) => {
    const paramsId = req.params.materialId;
    const body = { enable: false }
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
}



const materialPost = async (req = request, res = response) => {
    //TODO: Usar desestructuracion de objetos
    const body = req.body;
    console.log(body);
    const material = new Material(body);

    const materialSaved = await material.save();

    res.status(201).json({
        msg: 'Post API - Recetas post',
        materialSaved
    })
}



module.exports = { materialPost, getMaterials, getMaterialsById, updateMaterialById, deleteMaterialById }