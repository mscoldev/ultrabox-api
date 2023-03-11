"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model;

var locationSchema = Schema({
  name: {
    type: String,
    required: [true, 'Defina un nombre para la ubicación']
  },
  id_controller: {
    type: Number,
    required: false,
    unique: true
  },
  description: {
    type: String,
    required: false
  },
  deleted: {
    type: Boolean,
    required: [true, 'Default Disable'],
    "default": false
  },
  productionLineUse: [{
    ref: 'ProductionLine',
    type: Schema.Types.ObjectId
  }]
}, {
  timestamps: true,
  versionKey: false
});
module.exports = model('Location', locationSchema);