const { Router } = require('express');
const baseAuth = require('../baseAuth');

// Funciones desde el controlador
const {
    getRoles,
    getRoleById,
    updateRoleById,
    createRole,
    deleteRoleById
} = require("../../controllers/mes/role.controller");

const { ROLE: NAME_MODULE } = require('../../constants/module_names');

const authenticate = baseAuth(NAME_MODULE);

const router = Router();


//Routes Role
router.get('/', authenticate, getRoles);

router.get('/:_id', authenticate, getRoleById);

router.post('/', authenticate, createRole);

router.put('/:_id', authenticate, updateRoleById);

router.delete('/:_id', authenticate, deleteRoleById);



module.exports = router;