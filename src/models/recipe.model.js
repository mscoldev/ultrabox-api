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
    _idRecipeMaterials: [{
        ref: 'RecipeMaterial',
        type: Schema.Types.ObjectId,
        alias: 'Components'
    }],
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Recipe', recipeSchema);