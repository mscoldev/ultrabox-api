
const { Router } = require('express');

const { getWeight } = require('../../controllers/scale/weight.controller');


const router = Router();


router.get('/', getWeight)


module.exports = router;