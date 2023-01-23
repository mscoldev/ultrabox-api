const { Router } = require('express');


// Funciones desde el controlador
const {
    getProductionLogs,
    createProductionLog
} = require("../../controllers/mes/productionLogs.controller");



const router = Router();


//Routes production

router.get('/', getProductionLogs);
router.post('/', createProductionLog);


module.exports = router;