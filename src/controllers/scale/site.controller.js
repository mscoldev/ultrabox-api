const { response, request } = require('express');
const Site = require('../../models/scale/site.model');


const getSites = async (req = request, res = response) => {
    try {
        const site = await Site.findAll();
        res.status(200).json({
            msg: 'Lista de Proyectos',
            site
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


const getSiteById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const site = await Site.findByPk(id);
        if (site != null) {
            res.status(200).json({
                msg: 'Información del Proyecto',
                site
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


const updateSiteById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { name, enable } = req.body;
        const siteUpdated = await Site.findByPk(id);

        if (siteUpdated != null) {
            console.log('found');
            siteUpdated.name = name;
            siteUpdated.enable = enable;

            await siteUpdated.save();

            res.status(200).json({
                msg: 'Origen actualizado',
                siteUpdated
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
const deleteSiteById = async (req = request, res = response) => {
    try {
        const paramsId = req.params.ProjectId;
        const body = { deleted: true }
        const deletedSite = await Site.findByIdAndUpdate(paramsId, body);
        if (deletedSite != null) {
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



const createSite = async (req = request, res = response) => {
    try {
        const { name } = req.body
        const newSite = await Site.create({
            name
        });

        res.status(201).json({
            msg: 'Origen creado satisfactoriamente!',
            newSite
        })
    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` })
    }

}



module.exports = {
    getSites,
    getSiteById,
    updateSiteById,
    deleteSiteById,
    createSite
}