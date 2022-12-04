const { response, request } = require('express');
const TypesDocument = require("../../models/typesDocument.model");


const getTypesDocuments = async (req = request, res = response) => {
    try {
        const typesDocuments = await TypesDocument.find({ "deleted": false });
        res.status(200).json({
            msg: 'List of TypesDocuments',
            typesDocuments
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const getTypesDocumentById = async (req = request, res = response) => {
    const paramsId = req.params._id;
    const typesDocument = await TypesDocument.findById(paramsId);
    if (typesDocument != null) {
        res.status(200).json({
            msg: 'TypesDocument por Id',
            typesDocument
        });
    } else {
        res.status(404).json({
            msg: 'Tipo de documento no encontrado'
        })
    }
}

const updateTypesDocumentById = async (req = request, res = response) => {
    try {
        const paramsId = req.params._id;
        const body = req.body;
        const updatedTypeDocument = await TypesDocument.findByIdAndUpdate(paramsId, body, { new: true });
        if (updatedTypeDocument != null) {
            res.status(200).json({
                msg: 'Tipo de documentio actualizado por Id',
                updatedTypeDocument
            });
        } else {
            res.status(404).json({
                msg: 'TypesDocument no encontrado, verifique el Id ingresado'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

const deleteTypesDocumentById = async (req = request, res = response) => {
    try {
        const paramsId = req.params._id;
        const body = { deleted: true }
        const deletedTypesDocument = await TypesDocument.findByIdAndUpdate(paramsId, body);
        if (deletedTypesDocument != null) {
            res.status(200).json({
                msg: 'TypesDocument eliminado Id:' + paramsId
            });
        } else {
            res.status(404).json({
                msg: 'TypesDocument no encontrado, verifique el Id ingresado'
            })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}



const createTypesDocument = async (req = request, res = response) => {
    //TODO: Usar desestructuracion de objetos
    try {
        const { name } = req.body;

        const typesDocument = new TypesDocument({ name });

        const typesDocumentSaved = await typesDocument.save();

        res.status(201).json({
            msg: 'TypesDocument created successfully',
            typesDocumentSaved
        })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

}



module.exports = { createTypesDocument, getTypesDocuments, getTypesDocumentById, updateTypesDocumentById, deleteTypesDocumentById }