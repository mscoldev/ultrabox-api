"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model,
    now = _require.now;

var scheduleSchema = Schema({
  qtyProduce: {
    type: Number,
    required: [true, 'Defina una cantidad a producir']
  },
  action: {
    type: String,
    required: [true, 'Define una acción para este registro']
  },
  dateStart: {
    type: Date,
    required: [true, 'Define una fecha de inicio para el plan'],
    validate: {
      validator: function validator(v) {
        return /\S+/.test(v);
      },
      message: 'El campo name no puede estar en blanco'
    },
    "default": now,
    min: '2023-01-01'
  },
  dateEnd: {
    type: Date,
    required: [true, 'Define una fecha de fin para el plan'],
    validate: {
      validator: function validator(v) {
        return /\S+/.test(v);
      },
      message: 'El campo name no puede estar en blanco'
    },
    "default": now,
    min: '2023-01-01'
  },
  status: {
    type: String,
    required: [true, 'Define una estado para este registro']
  },
  _idProductionLine: {
    ref: 'ProductionLine',
    type: Schema.Types.ObjectId
  },
  _idRecipe: {
    ref: 'Recipe',
    type: Schema.Types.ObjectId
  },
  _idUser: {
    ref: 'User',
    type: Schema.Types.ObjectId
  },
  _idClient: {
    type: Schema.Types.ObjectId,
    ref: 'ProductionLine',
    required: false
  }
}, {
  timestamps: true,
  versionKey: false
});
module.exports = model('Schedule', scheduleSchema);