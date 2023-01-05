const { response, request } = require('express');
const Origin = require('../../models/scale/origin.model');


const getOrigins = async (req = request, res = response) => {
    try {
        const origins = await Origin.findAll({ where: { enabled: true } });
        res.status(200).json({
            msg: 'Lista de origenes',
            origins
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


const getOriginById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const origin = await Origin.findByPk(id);

        if (origin != null) {
            res.status(200).json({
                msg: 'Información del origen',
                origin
            });
        } else {
            console.log('Not found');
            res.status(200).json({
                msg: 'Origen no encontrado, verifique id'
            });
        }

    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` });
    }
}


const updateOriginById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { originName, nit, enable } = req.body;
        const originUpdated = await Origin.findByPk(id);

        if (originUpdated != null) {
            console.log('found');
            originUpdated.originName = originName;
            originUpdated.nit = nit;
            originUpdated.enable = enable;

            await originUpdated.save();

            res.status(200).json({
                msg: 'Origen actualizado',
                originUpdated
            });
        } else {
            console.log('Not found');
            res.status(200).json({
                msg: 'Origen no encontrado, verifique id'
            });
        }

    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` });
    }
}


const deleteOriginById = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const deletedOrigin = await Origin.findByPk(id)
        if (deletedOrigin != null) {

            deletedOrigin.enabled = false;
            await deletedOrigin.save();

            res.status(202).json({
                msg: `El origen con Id: ${id}, ha sido eliminado.`
            });
        } else {
            res.status(404).json({
                msg: `El origen con Id: ${id}, no ha sido encontrado, verifique el Id ingresado nuevamente`
            })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}



const createOrigin = async (req = request, res = response) => {
    try {
        const { originName } = req.body
        const newOrigin = await Origin.create({
            originName
        });

        res.status(201).json({
            msg: 'Origen creado satisfactoriamente!',
            newOrigin
        })
    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` })
    }

}



module.exports = {
    getOrigins,
    getOriginById,
    updateOriginById,
    deleteOriginById,
    createOrigin
}