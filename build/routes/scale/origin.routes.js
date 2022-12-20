"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../../middlewares/validateJWT'),
    validateJWT = _require2.validateJWT;

var _require3 = require('../../controllers/scale/origin.controller'),
    getOrigins = _require3.getOrigins,
    getOriginById = _require3.getOriginById,
    updateOriginById = _require3.updateOriginById,
    deleteOriginById = _require3.deleteOriginById,
    createOrigin = _require3.createOrigin;

var router = Router();
router.get('/', getOrigins);
router.get('/:id', getOriginById);
router.put('/:id', [validateJWT], updateOriginById);
router.post('/', [validateJWT], createOrigin);
router["delete"]('/:id', [validateJWT], deleteOriginById);
module.exports = router;