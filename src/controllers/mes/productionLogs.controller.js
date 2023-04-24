const { response, request } = require('express');
const ProductionLog = require('../../models/mes/productionLog.model');
const ProductionLine = require('../../models/productionLine.model');
const Boom = require('@hapi/boom');

const getProductionLogs = async (req = request, res = response) => {
  const { sort, limit } = req.query;
  console.log(req.query);
  try {
    const productionLogs = await ProductionLog.find()
      .sort({ createdAt: sort })
      .limit(limit)
      .exec();
    const productionLines = await ProductionLine.find();
    res.status(200).json({
      msg: 'Registros de produccion',
      productionLogs,
      productionLines,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: `Opps!, se ha generado un error: ${err.message}` });
  }
};

const createProductionLog = async (req = request, res = response) => {
  try {
    const body = req.body;
    console.log(body);
    const productionLog = new ProductionLog(body);

    const productionLogSaved = await productionLog.save();

    res.status(201).json({
      msg: 'Registro de produccion creado',
      productionLogSaved,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: `Opps!, se ha producido un error : ${err.message}` });
  }
};

const updateFlagProductionLog = async (req = request, res = response, next) => {
  try {
    const { _id } = req.params;
    const body = req.body;
    console.log(body);
    const { migrate } = body;
    const data = {
      $push: {
        migrate,
      },
    };

    const productionLogSaved = await ProductionLog.findByIdAndUpdate(
      _id,
      data,
      { new: true }
    );

    if (!productionLogSaved) {
      throw Boom.badRequest(
        'Oops!, _id no encontrado o tienes un error en la consulta. Verifica el registro que deseas actualizar.'
      );
    } else
      res.status(202).json({
        msg: 'Bandera actualizada con exito!',
        productionLogSaved,
      });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProductionLogs,
  createProductionLog,
  updateFlagProductionLog,
};
