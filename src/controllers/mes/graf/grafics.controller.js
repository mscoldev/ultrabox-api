const { response, request } = require('express');


const getGraficsMolinos = async (req = request, res = response) => {
    res.status(200).json({
        msg: 'Grafico Molinos'
    })
}

const getGraficskwton = async (req = request, res = response) => {
    res.status(200).json({
        msg: 'Grafico kwton'
    })
}

module.exports = { getGraficsMolinos, getGraficskwton }