"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../../controllers/scale/weight.controller'),
    getWeight = _require2.getWeight;

var router = Router();
router.get('/', getWeight);
module.exports = router;