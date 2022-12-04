"use strict";

var _require = require('express'),
    Router = _require.Router; // Funciones desde el controlador


var _require2 = require("../../controllers/mes/typesDocument.controller"),
    getTypesDocuments = _require2.getTypesDocuments,
    getTypesDocumentById = _require2.getTypesDocumentById,
    updateTypesDocumentById = _require2.updateTypesDocumentById,
    createTypesDocument = _require2.createTypesDocument,
    deleteTypesDocumentById = _require2.deleteTypesDocumentById;

var router = Router(); //Routes TypesDocument

router.get('/', getTypesDocuments);
router.get('/:_id', getTypesDocumentById);
router.post('/', createTypesDocument);
router.put('/:_id', updateTypesDocumentById);
router["delete"]('/:_id', deleteTypesDocumentById);
module.exports = router;