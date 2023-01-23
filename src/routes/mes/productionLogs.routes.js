const { Router } = require('express');
const { check } = require('express-validator');

// Funciones desde el controlador
const {
    getProductionLogs,
    createProductionLog
} = require("../../controllers/mes/productionLogs.controller");

const { validateFields } = require('../../middlewares/validateFields');

const router = Router();


//Routes production

router.get('/', getProductionLogs);
router.post('/', [
    check('uuid', 'Defina un UUID4 Valido').isUUID(4),
    validateFields
], createProductionLog);


module.exports = router;