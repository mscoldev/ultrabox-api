
const { Router } = require('express');
const baseAuth = require('../baseAuth');

const { getWeight } = require('../../controllers/scale/weight.controller');

const { WEIGHT: NAME_MODULE } = require('../../constants/module_names');

const authenticate = baseAuth(NAME_MODULE);

const router = Router();


router.get('/', authenticate, getWeight)


module.exports = router;