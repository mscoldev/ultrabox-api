
const { Router } = require('express');

const { getWeight } = require('../../controllers/scale/client.controller');

const router = Router();


router.get('/', getWeight)


module.exports = router;