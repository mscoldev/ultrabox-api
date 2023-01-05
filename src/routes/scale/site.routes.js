
const { Router } = require('express');

const { validateJWT } = require('../../middlewares/validateJWT');


const { getSites,
    getSiteById,
    updateSiteById,
    deleteSiteById,
    createSite } = require('../../controllers/scale/site.controller');

const router = Router();


router.get('/', getSites);

router.get('/:id', getSiteById);

router.put('/:id', [validateJWT], updateSiteById);

router.post('/', [validateJWT], createSite);

router.delete('/:id', [validateJWT], deleteSiteById);




module.exports = router;