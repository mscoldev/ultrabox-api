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
        const { startDate, endDate } = req.query
        //*PREPARACION CONSULTA.
        console.log(startDate);
        console.log(endDate);

        const setStartDateSet = new Date(startDate);
        const setEndDate = new Date(endDate);

        console.log(setStartDateSet);
        console.log(setEndDate);


        //*Buscar datos entre las fechas starDate y endDate
        const queryResult = await ProductionLog.find({
            cantidad: { $gt: 0 },
            $and: [
                { createdAt: { $gte: setStartDateSet } },
                { createdAt: { $lt: setEndDate } },
            ]
        }).then((productionLogs) => {
            const modifiedProductionLogs = productionLogs.map((productionLog) => {
                const modifiedProductionLog = productionLog.toObject();
                modifiedProductionLog.kwTot = productionLog.kwhpd004 + productionLog.kwhpd005 + productionLog.kwhpd006;
                modifiedProductionLog.kwTon = Math.floor10(modifiedProductionLog.kwTot / productionLog.cantidad, -3);
                return modifiedProductionLog;
            });
            return modifiedProductionLogs
        }).catch((err) => {
            console.error(err);
        });


        // //*Expresion JSONata
        const ex = `{"molino1":$average($filter($, function ($v, $i, $a) {$v.molino = "1"}).kwTon),
        "molino2": $average($filter($, function ($v, $i, $a) { $v.molino = "2" }).kwTon)}`

        const data = await nataFunction(queryResult, ex)

        res.status(200).json({
            msg: 'Grafico Molinos',
            data
        })
        // console.log(test.req.body);
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
}






module.exports = { getGraficsMolinos, getGraficskwton }