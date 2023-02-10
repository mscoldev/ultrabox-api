const { response, request } = require('express');
const ConfApp = require('../models/confApp.model');


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

const setConfCompany = async (req = request, res = response) => {
    const { company, nit, initSerial } = req.body;
    try {
        const confAppCompany = new ConfApp({
            company,
            nit,
            initSerial
        });

        const confAppCompanySaved = await confAppCompany.save();

        res.status(201).json({
            msg: 'Configuracion cargada',
            confAppCompanySaved
        })

    } catch (err) {
        return res.status(500).json({
            msg: `Algo ha salido mal...${err.message}`
        })
    }

}




module.exports = {
    getConfActiveCompany,
    setConfCompany,
}