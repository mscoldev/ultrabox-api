const { response, request } = require('express');
const Project = require('../../models/scale/project.model');


const getProjects = async (req = request, res = response) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json({
            msg: 'Lista de Proyectos',
            projects
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


const getProjectById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);
        if (project != null) {
            res.status(200).json({
                msg: 'Información del Proyecto',
                project
            });
        } else {
            console.log('Not found');
            res.status(200).json({
                msg: 'Projecto no encontrado, verifique id'
            });
        }

    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` });
    }
}


const updateProjectById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { projectName, enable } = req.body;
        const projectUpdated = await Project.findByPk(id);

        if (projectUpdated != null) {
            console.log('found');
            projectUpdated.projectName = projectName;
            projectUpdated.enable = enable;

            await projectUpdated.save();

            res.status(200).json({
                msg: 'Origen actualizado',
                projectUpdated
            });
        } else {
            console.log('Not found');
            res.status(200).json({
                msg: 'Projecto no encontrado, verifique id'
            });
        }

    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` });
    }
}

//TODO: Pendiente Implementar
const deleteProjectById = async (req = request, res = response) => {
    try {
        const paramsId = req.params.ProjectId;
        const body = { deleted: true }
        const deletedProject = await Project.findByIdAndUpdate(paramsId, body);
        if (deletedProject != null) {
            res.status(200).json({
                msg: 'Projects eliminado Id:' + paramsId
            });
        } else {
            res.status(404).json({
                msg: 'Projects no encontrado, verifique el Id ingresado'
            })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}



const createProject = async (req = request, res = response) => {
    try {
        const { projectName } = req.body
        const newProject = await Project.create({
            projectName
        });

        res.status(201).json({
            msg: 'Origen creado satisfactoriamente!',
            newProject
        })
    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` })
    }

}



module.exports = {
    getProjects,
    getProjectById,
    updateProjectById,
    deleteProjectById,
    createProject
}