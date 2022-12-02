
const { Router } = require('express');

const { getOrigins,
    getOriginById,
    updateOriginById,
    deleteOriginById,
    createOrigin } = require('../../controllers/scale/origin.controller');

const router = Router();


router.get('/', getOrigins);

router.get('/:id', getOriginById);

router.put('/:id', updateOriginById);

router.post('/', createOrigin);

router.delete('/:id', deleteOriginById);




module.exports = router;