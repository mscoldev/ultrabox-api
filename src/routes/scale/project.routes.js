
const { Router } = require('express');

const { getProjects,
    getProjectById,
    updateProjectById,
    deleteProjectById,
    createProject } = require('../../controllers/scale/project.controller');

const router = Router();


router.get('/', getProjects);

router.get('/:id', getProjectById);

router.put('/:id', updateProjectById);

router.post('/', createProject);

router.delete('/:id', deleteProjectById);




module.exports = router;