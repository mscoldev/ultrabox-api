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
    ingredients: [{
        type: Schema.Types.ObjectId,
        ref: 'Ingredient'
    }]
}, {
    timestamps: true,
    versionKey: false
})

const ingredientSchema = Schema({
    _idMaterial: {
        type: Schema.Types.ObjectId,
        ref: 'Material'
    },
    qty: {
        type: Number,
    }
}, {
    timestamps: true,
    versionKey: false
})

const Recipe = model('Recipe', recipeSchema);
const Ingredient = model('Ingredient', ingredientSchema)
module.exports = { Recipe, Ingredient }