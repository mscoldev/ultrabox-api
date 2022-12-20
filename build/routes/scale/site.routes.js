"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../../middlewares/validateJWT'),
    validateJWT = _require2.validateJWT;

var _require3 = require('../../controllers/scale/site.controller'),
    getSites = _require3.getSites,
    getSiteById = _require3.getSiteById,
    updateSiteById = _require3.updateSiteById,
    deleteSiteById = _require3.deleteSiteById,
    createSite = _require3.createSite;

var router = Router();
router.get('/', getSites);
router.get('/:id', getSiteById);
router.put('/:id', [validateJWT], updateSiteById);
router.post('/', [validateJWT], createSite);
router["delete"]('/:id', [validateJWT], deleteSiteById);
module.exports = router;