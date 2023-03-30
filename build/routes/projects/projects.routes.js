"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../../controllers/projects/acceptance.controller'),
    setAcceptance = _require2.setAcceptance,
    getAcceptanceById = _require2.getAcceptanceById;

var router = Router(); //*ACCEPTANCE

router.get('/acceptance/:_id', getAcceptanceById);
router.post('/acceptance', setAcceptance);
module.exports = router;