"use strict";

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model;

var fileSchema = Schema({
  fieldname: {
    type: String
  },
  originalname: {
    type: String
  },
  encoding: {
    type: String
  },
  mimetype: {
    type: String
  },
  filename: {
    type: String
  },
  path: {
    type: String
  },
  size: {
    type: Number
  }
}, {
  timestamps: false,
  versionKey: false
});
module.exports = model('File', fileSchema);
//# sourceMappingURL=file.model.js.map