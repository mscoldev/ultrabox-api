const { Schema, model } = require("mongoose")

const recipeSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre de la receta es obligatorio']
    },
    erp_code: {
        type: Number,
        required: [true, 'El codifo ERP es requerido'],
    },
    id_controller: {
        type: Number,
        required: false,
        unique: [true, 'Este id ya se encuentra registrado en otra receta']
    },
    deleted: {
        type: Boolean,
        required: [true, 'El estado deleted es requerido no puede dejarlo en blanco T/F'],
        default: false,
    },
    productionLineUse: [{
        type: Schema.Types.ObjectId, ref: 'ProductionLine',
        required: [true, 'Debe definir una la linea de produccion que utiliza esta receta']
    }],
    ingredients: [new Schema({
        _idMaterial: {
            type: Schema.Types.ObjectId,
            ref: 'Material',
            required: [true, 'Defina un id de material como ingrediente']
        },
        qty: {
            type: Number,
            required: [true, 'Defina la cantidad a utilizar del material']
        }
    })]
}, {
    timestamps: true,
    versionKey: false
})

const Recipe = model('Recipe', recipeSchema);
module.exports = Recipe