const { Router } = require('express');
const baseAuth = require('./baseAuth');
const { uploadFile, uploadFiles } = require('../controllers/upload.controller');

const { FILES: NAME_MODULE } = require('../constants/module_names');

const authenticate = baseAuth(NAME_MODULE);

const router = Router();

router.post('/upload', authenticate, uploadFile);
router.post('/images', authenticate, uploadFiles);



module.exports = router;
