const { Router } = require('express');


const {
    setAcceptance,
    getAcceptanceById,
    updateAcceptanceById
} = require('../../controllers/projects/acceptance.controller')

const router = Router();





//*ACCEPTANCE
router.get('/acceptance/', getAcceptanceById);
router.get('/acceptance/:_id', getAcceptanceById);

router.post('/acceptance', setAcceptance);
router.put('/acceptance/:_id', updateAcceptanceById);





module.exports = router;