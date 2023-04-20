"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../../controllers/scale/site.controller'),
    getSites = _require2.getSites,
    getSiteById = _require2.getSiteById,
    updateSiteById = _require2.updateSiteById,
    deleteSiteById = _require2.deleteSiteById,
    createSite = _require2.createSite;

var router = Router();
router.get('/', getSites);
router.get('/:id', getSiteById);
router.put('/:id', updateSiteById);
router.post('/', createSite);
router["delete"]('/:id', deleteSiteById);
module.exports = router;
//# sourceMappingURL=site.routes.js.map