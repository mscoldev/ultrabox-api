"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/upload.controller'),
    uploadFile = _require2.uploadFile,
    uploadFiles = _require2.uploadFiles;

var router = Router();
router.post('/upload', uploadFile);
router.post('/images', uploadFiles);
module.exports = router;