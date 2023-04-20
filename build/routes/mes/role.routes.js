"use strict";

var _require = require('express'),
    Router = _require.Router; // Funciones desde el controlador


var _require2 = require("../../controllers/mes/role.controller"),
    getRoles = _require2.getRoles,
    getRoleById = _require2.getRoleById,
    updateRoleById = _require2.updateRoleById,
    createRole = _require2.createRole,
    deleteRoleById = _require2.deleteRoleById;

var router = Router(); //Routes Role

router.get('/', getRoles);
router.get('/:_id', getRoleById);
router.post('/', createRole);
router.put('/:_id', updateRoleById);
router["delete"]('/:_id', deleteRoleById);
module.exports = router;
//# sourceMappingURL=role.routes.js.map