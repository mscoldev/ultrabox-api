
const { Router } = require('express');

const { validateJWT } = require('../../middlewares/validateJWT');

const { getOrigins,
    getOriginById,
    updateOriginById,
    deleteOriginById,
    createOrigin } = require('../../controllers/scale/origin.controller');

const router = Router();


router.get('/', getOrigins);

router.get('/:id', getOriginById);

router.put('/:id', [validateJWT], updateOriginById);

router.post('/', [validateJWT], createOrigin);

router.delete('/:id', [validateJWT], deleteOriginById);




module.exports = router;