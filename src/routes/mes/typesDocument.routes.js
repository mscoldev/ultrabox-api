const { Router } = require('express');
const baseAuth = require('../baseAuth');

// Funciones desde el controlador
const {
    getTypesDocuments,
    getTypesDocumentById,
    updateTypesDocumentById,
    createTypesDocument,
    deleteTypesDocumentById
} = require("../../controllers/mes/typesDocument.controller");

const { TYPES_DOCUMENT: NAME_MODULE } = require('../../constants/module_names');

const authenticate = baseAuth(NAME_MODULE);

const router = Router();


//Routes TypesDocument
router.get('/', authenticate, getTypesDocuments);

router.get('/:_id', authenticate, getTypesDocumentById);

router.post('/', authenticate, createTypesDocument);

router.put('/:_id', authenticate, updateTypesDocumentById);

router.delete('/:_id', authenticate, deleteTypesDocumentById);



module.exports = router;