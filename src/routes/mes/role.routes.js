const { Router } = require('express');


// Funciones desde el controlador
const {
    getRoles,
    getRoleById,
    updateRoleById,
    createRole,
    deleteRoleById
} = require("../../controllers/mes/role.controller");


const router = Router();


//Routes Role
router.get('/', getRoles);

router.get('/:_id', getRoleById);

router.post('/', createRole);

router.put('/:_id', updateRoleById);

router.delete('/:_id', deleteRoleById);



module.exports = router;