const { Router } = require('express');
const baseAuth = require('../baseAuth');

// Funciones desde el controlador
const {
    getSchedule,
    getScheduleById,
    setSchedule,
    updateScheduleById,
    deleteScheduleById
} = require("../../controllers/mes/scheduling.controller");

const { SCHEDULING: NAME_MODULE } = require('../../constants/module_names');

const authenticate = baseAuth(NAME_MODULE);

const router = Router();


//Routes TypesDocument
router.get('/', authenticate, getSchedule);

router.get('/:_id', authenticate, getScheduleById);

router.post('/', authenticate, setSchedule);

router.put('/:_id', authenticate, updateScheduleById);

router.delete('/:_id', authenticate, deleteScheduleById);



module.exports = router;