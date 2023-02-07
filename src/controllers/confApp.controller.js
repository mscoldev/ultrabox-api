const { response, request } = require('express');
const ConfApp = require('../models/confApp.model');
const boom = require('@hapi/boom');


const getConfActiveCompany = async (req = request, res = response) => {
    try {

        const confAppCompany = await ConfApp.findOne({ "deleted": false })
        res.status(200).json({
            msg: 'Configuracion de la compania',
            confAppCompany
        })

    } catch (err) {
        return res.status(500).json({
            msg: 'Algo ha salido mal...'
        })
    }

}

const setConfCompany = async (req = request, res = respons, next) => {
    const { company, nit, initSerial } = req.body;
    const id = req.params.id
    try {
        const confAppCompany = {
            company,
            nit,
            initSerial
        };
        const confAppCompanySaved = await ConfApp.findByIdAndUpdate(id, confAppCompany, { new: true });
        if (confAppCompanySaved != null) {
            res.status(200).json({
                msg: 'Configuracion actualizada',
                confAppCompanySaved
            });
        } else {
            throw boom.badRequest('Configuracion no encontrada o con parametros incorrectos')
        }

    } catch (err) {
        next(err)
    }

}




module.exports = {
    getConfActiveCompany,
    setConfCompany,
}