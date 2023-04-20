"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model;

var typesDocumentSchema = Schema({
  name: {
    type: String,
    unique: [false, 'Ya existe un rol con este nombre.'],
    required: [true, 'El nombre es requerido, debe definir uno']
  },
  deleted: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true,
  versionKey: false
});
module.exports = model('typesDocument', typesDocumentSchema);
//# sourceMappingURL=typesDocument.model.js.map