const { response, request } = require('express');
const ProductionLog = require('../../../models/mes/productionLog.model');
const nataFunction = require('../../../helpers/JSONata')

const getGraficsMolinos = async (req = request, res = response) => {
    try {
        const result1 = await ProductionLog.aggregate([
            { $match: { molino: 1 } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    kgTotales: { $sum: "$cantidad" }
                }
            },
            {
                $sort: {
                    createdAt: 1
                }
            }
        ]);
        const result2 = await ProductionLog.aggregate([
            { $match: { molino: 2 } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    kgTotales: { $sum: "$cantidad" }
                }
            },
            {
                $sort: {
                    createdAt: 1
                }
            }
        ]);

        res.status(200).json({
            msg: 'Grafico Molinos',
            molino1: result1,
            molino2: result2
        })
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
}

const getGraficskwton = async (req = request, res = response) => {
    try {
        const data = await ProductionLog.find({ cantidad: { $gt: 0 } }).select({
            codigo: 1,
            unidad: 1,
            cantidad: 1,
            estado: 1,
            molino: 1,
            receta: 1,
            silo: 1,
            kwhpd004: 1,
            kwhpd005: 1,
            kwhpd006: 1,
            m3gas: 1,
            m3ton: 1,
            createdAt: { $toString: "$createdAt" },
            updatedAt: { $toString: "$updatedAt" }
        }).lean()
        const molino = {
            data
        };

        console.log(molino);

        //*Expresion JSONata
        const ex = `$filter($, function ($v, $i, $a) {$v.createdAt <= "2023-01-21"}).kwTon`
        const result = await nataFunction(data, ex)
        console.log(result);
        //Resultado
        const test = res.status(200).json({
            msg: 'Grafico Molinos',
            molino1: data
        })
        // console.log(test.req.body);
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
}






module.exports = { getGraficsMolinos, getGraficskwton }