const { response, request } = require('express');
const ProductionLog = require("../../../models/mes/productionLog.model");

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
        const result1 = await ProductionLog.aggregate([
            { $match: { molino: 2, receta: 5 } },
            { $project: { kwton: { $divide: [{ $sum: "$kwhpd004" }, { $sum: "$cantidad" }] } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },

                }
            },
            {
                $sort: {
                    createdAt: 1
                }
            }
        ])
        res.status(200).json({
            msg: 'Grafico Molinos',
            molino1: result1,
        })
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
}
module.exports = { getGraficsMolinos, getGraficskwton }