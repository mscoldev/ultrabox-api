"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model;

var productionLineSchema = Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  erp_code: {
    type: Number,
    required: false,
    unique: [true, 'the erp_code is unique']
  },
  deleted: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true,
  versionKey: false
});
module.exports = model('ProductionLine', productionLineSchema);