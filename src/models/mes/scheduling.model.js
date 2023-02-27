const { Schema, model, now } = require("mongoose")
const moment = require("moment");
const jsonata = require('jsonata');

const scheduleSchema = Schema({
    qtyProduce: {
        type: Number,
        required: [true, 'Defina una cantidad a producir']
    },
    action: {
        type: String,
        required: [true, 'Define una acción para este registro'],
    },
    dateStart: {
        type: Date,
        required: [true, 'Define una fecha de inicio para el plan'],
        validate: {
            validator: function (v) {
                return /\S+/.test(v);
            },
            message: 'El campo name no puede estar en blanco'
        },
        default: now,
        min: '2023-01-01'
    },
    dateEnd: {
        type: Date,
        required: [true, 'Define una fecha de fin para el plan'],
        validate: {
            validator: function (v) {
                return /\S+/.test(v);
            },
            message: 'El campo name no puede estar en blanco'
        },
        default: now,
        min: '2023-01-01'
    },
    status: {
        type: String,
        required: [true, 'Define una estado para este registro'],
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
    },
}, {
    timestamps: true,
    versionKey: false
})

scheduleSchema.methods.toJSON = function () {
    const { dateStart, dateEnd, ...schedule } = this.toObject();
    schedule.dateTimeScheduleStart = dateStart;
    schedule.dateTimeScheduleEnd = dateEnd;
    schedule.dateStart = moment(dateStart).format("YYYY-MM-DD");
    schedule.dateEnd = moment(dateEnd).format("YYYY-MM-DD");
    schedule.hourStart = moment(dateStart).format("HH:mm");
    schedule.hourEnd = moment(dateEnd).format("HH:mm");

    const formatSchedule = JSONataExpression(schedule)
    return formatSchedule
}

function JSONataExpression(dataPromise) {
    const expression = jsonata(JSONataExp);
    const result = expression.evaluate(dataPromise);
    return result;
}

const JSONataExp = `$.{
    "_id":_id,
    "qtyProduce":qtyProduce,
    "action":action,
    "status":status,
    "dateTimeScheduleStart":dateTimeScheduleStart,
    "dateTimeScheduleEnd":dateTimeScheduleEnd,
    "dateStart": dateStart,
    "dateEnd": dateEnd,
    "hourStart":hourStart,
    "hourEnd": hourEnd,
    "_idProductionLine":{
        "id":_idProductionLine._id,
        "name":_idProductionLine.name,
        "erp_code":_idProductionLine.erp_code,
        "id_controller":_idProductionLine.id_controller
    },
    "_idRecipe":{
        "_id":_idRecipe._id,
        "name":_idRecipe.name,
        "erp_code":_idRecipe.erp_code,
        "id_controller":_idRecipe.id_controller,
        "ingredients":$._idRecipe.ingredients.[$.{
            "idIngredients":_id,
            "idMaterial":_idMaterial._id,
            "name":_idMaterial.name,
            "qty":qty
        }]
    }
}`




module.exports = model('Schedule', scheduleSchema);