"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../../controllers/scale/origin.controller'),
    getOrigins = _require2.getOrigins,
    getOriginById = _require2.getOriginById,
    updateOriginById = _require2.updateOriginById,
    deleteOriginById = _require2.deleteOriginById,
    createOrigin = _require2.createOrigin;

var router = Router();
router.get('/', getOrigins);
router.get('/:id', getOriginById);
router.put('/:id', updateOriginById);
router.post('/', createOrigin);
router["delete"]('/:id', deleteOriginById);
module.exports = router;