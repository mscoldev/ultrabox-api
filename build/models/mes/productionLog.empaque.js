"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model;

var moment = require('moment');

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
    required: [true, 'Debe indicar el punto de producción molino']
  },
  linea_producción: {
    type: Schema.Types.ObjectId,
    required: [true, 'El id de una linea de producción']
  },
  receta: {
    type: Number,
    required: [true, 'Debe definir una receta para el registro de producción']
  },
  silo: {
    type: Number,
    required: [true, 'Debe seleccionar un lugar de destino para la producción']
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