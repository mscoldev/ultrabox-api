const { Router } = require('express');
const baseAuth = require('../baseAuth');

// Funciones desde el controlador
const {
    getModules,
    getChildrenModuleById,
    createModule,
    updateModuleById,
    deleteModuleById,
} = require("../../controllers/mes/module.controller");

const { MODULE: NAME_MODULE } = require('../../constants/module_names');

const authenticate = baseAuth(NAME_MODULE);

const router = Router();


//Routes Module
router.get('/', authenticate, getModules);

router.get('/:_id',  authenticate, getChildrenModuleById);

router.post('/',  authenticate, createModule);

router.put('/:_id', authenticate, updateModuleById);

router.delete('/:_id', authenticate, deleteModuleById);



module.exports = router;