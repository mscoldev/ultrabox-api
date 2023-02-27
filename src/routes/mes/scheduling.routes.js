const { Router } = require('express');


// Funciones desde el controlador
const {
    getSchedule,
    getScheduleById,
    setSchedule,
    updateScheduleById,
    deleteScheduleById
} = require("../../controllers/mes/scheduling.controller");


const router = Router();


//Routes TypesDocument
router.get('/', getSchedule);

router.get('/:_id', getScheduleById);

router.post('/', setSchedule);

router.put('/:_id', updateScheduleById);

router.delete('/:_id', deleteScheduleById);



module.exports = router;