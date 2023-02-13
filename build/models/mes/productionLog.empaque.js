"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model,
    mongoose = _require["default"];

var moment = require('moment');

var productionLineModel = require("../productionLine.model"); //*contador, punto de carge(De donde se toma),


var productionLogSchema = Schema({
  codigo: {
    type: Number,
    required: [true, 'El codigo es requerido']
  },
  unidad: {
    type: String,
    required: [true, 'La unidad de medida es requerida']
  },
  cantidad: {
    type: Number,
    required: [true, 'Las cantidades son requeridas para el registro']
  },
  estado: {
    type: Boolean,
    "default": false
  },
  molino: {
    type: String,
    required: [true, 'Debe indicar el punto de produccion molino']
  },
  linea_produccion: {
    type: Schema.Types.ObjectId,
    required: [true, 'El id de una linea de produccion']
  },
  receta: {
    type: Number,
    required: [true, 'Debe definir una receta para el registro de produccion']
  },
  silo: {
    type: Number,
    required: [true, 'Debe seleccionar un lugar de destino para la produccion']
  },
  kwhpd004: {
    type: Number,
    required: [false],
    "default": 0
  },
  kwhpd005: {
    type: Number,
    required: [false],
    "default": 0
  },
  kwhpd006: {
    type: Number,
    required: [false],
    "default": 0
  },
  m3gas: {
    type: Number,
    required: [false],
    "default": 0
  },
  m3ton: {
    type: Number,
    required: [false],
    "default": 0
  }
}, {
  timestamps: true,
  versionKey: false
});

productionLogSchema.methods.toJSON = function () {
  var productionLog = this.toObject();
  productionLog.createdAt = moment(productionLog.createdAt).format('DD-MM-YYYY HH:mm');
  productionLog.updatedAt = moment(productionLog.updatedAt).format('DD-MM-YYYY HH:mm');
  return productionLog;
};

module.exports = model('productionLog', productionLogSchema);