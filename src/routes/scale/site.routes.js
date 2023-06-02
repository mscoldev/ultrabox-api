
const { Router } = require('express');
const baseAuth = require('../baseAuth');

const { getSites,
    getSiteById,
    updateSiteById,
    deleteSiteById,
    createSite } = require('../../controllers/scale/site.controller');


const { SITE: NAME_MODULE } = require('../../constants/module_names');

const authenticate = baseAuth(NAME_MODULE);
    
const router = Router();


router.get('/', authenticate, getSites);

router.get('/:id', authenticate, getSiteById);

router.put('/:id', authenticate, updateSiteById);

router.post('/', authenticate, createSite);

router.delete('/:id', authenticate, deleteSiteById);




module.exports = router;