const { Router } = require('express');
const { uploadFile, uploadFiles } = require('../controllers/upload.controller');

const router = Router();

router.post('/upload', uploadFile);
router.post('/images', uploadFiles);



module.exports = router;
