"use strict";

var _require = require('mongoose'),
    model = _require.model,
    Schema = _require.Schema;

var connectionSchema = Schema({
  ipAddress: {
    type: String,
    required: true,
    unique: true
  },
  slot: {
    type: Number,
    required: true,
    unique: true
  },
  cycleTime: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  tags: [{
    name: {
      type: String,
      required: true,
      unique: true
    },
    type: {
      type: String,
      required: true,
      unique: true
    },
    ambit: {
      type: String,
      required: true,
      unique: true
    }
  }]
}, {
  timestamps: true,
  versionKey: false
});
module.exports = model('connection', connectionSchema);
//# sourceMappingURL=conection.model.js.map