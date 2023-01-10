
const { Router } = require('express');


const { getSites,
    getSiteById,
    updateSiteById,
    deleteSiteById,
    createSite } = require('../../controllers/scale/site.controller');

const router = Router();


router.get('/', getSites);

router.get('/:id', getSiteById);

router.put('/:id', updateSiteById);

router.post('/', createSite);

router.delete('/:id', deleteSiteById);




module.exports = router;