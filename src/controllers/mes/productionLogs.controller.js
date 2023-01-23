const { response, request } = require("express");
const ProductionLog = require("../../models/mes/productionLog.model");



const getProductionLogs = async (req = request, res = response) => {
    const { sort, limit } = req.query
    try {
        const productionLogs = await ProductionLog.find()
            .sort({ createdAt: sort })
            .limit(limit);
        res.status(200).json({
            msg: 'Registros de produccion',
            productionLogs
        })
    } catch (err) {
        return res.status(500).json({ msg: `Opps!, se ha generado un error: ${err.message}` });
    }
}


const createProductionLog = async (req = request, res = response) => {
    try {
        const body = req.body;
        console.log(body);
        const productionLog = new ProductionLog(body);

        const productionLogSaved = await productionLog.save();

        res.status(201).json({
            msg: 'Registro de produccion creado',
            productionLogSaved
        })
    } catch (err) {
        return res.status(500).json({ msg: `Opps!, se ha producido un error : ${err.message}` })
    }
}

module.exports = {
    getProductionLogs,
    createProductionLog
}