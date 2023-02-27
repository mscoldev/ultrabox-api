"use strict";

var _excluded = ["dateStart", "dateEnd"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _require = require("mongoose"),
    Schema = _require.Schema,
    model = _require.model,
    now = _require.now;

var moment = require("moment");

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

scheduleSchema.methods.toJSON = function () {
  var _this$toObject = this.toObject(),
      dateStart = _this$toObject.dateStart,
      dateEnd = _this$toObject.dateEnd,
      schedule = _objectWithoutProperties(_this$toObject, _excluded);

  schedule.dateTimeScheduleStart = dateStart;
  schedule.dateTimeScheduleEnd = dateEnd;
  schedule.dateStart = moment(dateStart).format("YYYY-MM-DD");
  schedule.dateEnd = moment(dateEnd).format("YYYY-MM-DD");
  schedule.hourStart = moment(dateStart).format("HH:mm");
  schedule.hourEnd = moment(dateEnd).format("HH:mm");
  return schedule;
};

module.exports = model('Schedule', scheduleSchema);