const { Router } = require('express');


// Funciones desde el controlador
const {
    getTypesDocuments,
    getTypesDocumentById,
    updateTypesDocumentById,
    createTypesDocument,
    deleteTypesDocumentById
} = require("../../controllers/mes/typesDocument.controller");


const router = Router();


//Routes TypesDocument
router.get('/', getTypesDocuments);

router.get('/:_id', getTypesDocumentById);

router.post('/', createTypesDocument);

router.put('/:_id', updateTypesDocumentById);

router.delete('/:_id', deleteTypesDocumentById);



module.exports = router;