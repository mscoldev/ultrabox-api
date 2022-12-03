"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../../controllers/scale/project.controller'),
    getProjects = _require2.getProjects,
    getProjectById = _require2.getProjectById,
    updateProjectById = _require2.updateProjectById,
    deleteProjectById = _require2.deleteProjectById,
    createProject = _require2.createProject;

var router = Router();
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProjectById);
router.post('/', createProject);
router["delete"]('/:id', deleteProjectById);
module.exports = router;