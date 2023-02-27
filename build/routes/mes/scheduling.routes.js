"use strict";

var _require = require('express'),
    Router = _require.Router; // Funciones desde el controlador


var _require2 = require("../../controllers/mes/scheduling.controller"),
    getSchedule = _require2.getSchedule,
    getScheduleById = _require2.getScheduleById,
    setSchedule = _require2.setSchedule,
    updateScheduleById = _require2.updateScheduleById,
    deleteScheduleById = _require2.deleteScheduleById;

var router = Router(); //Routes TypesDocument

router.get('/', getSchedule);
router.get('/:_id', getScheduleById);
router.post('/', setSchedule);
router.put('/:_id', updateScheduleById);
router["delete"]('/:_id', deleteScheduleById);
module.exports = router;