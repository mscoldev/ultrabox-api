const { Router } = require('express');


const {
    setAcceptance,
    getAcceptanceById
} = require('../../controllers/projects/acceptance.controller')

const router = Router();





//*ACCEPTANCE
router.get('/acceptance/:_id', getAcceptanceById);
router.post('/acceptance', setAcceptance);





module.exports = router;
