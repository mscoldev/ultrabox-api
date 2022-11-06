const { Schema, model } = require("mongoose")

const recipeMaterialSchema = Schema({
    _idRecipe: {
        ref: 'Recipe',
        type: Schema.Types.ObjectId,
        alias: 'Recipe'
    },
    _idMaterial: {
        ref: 'Material',
        type: Schema.Types.ObjectId,
        alias: 'Materials'
    },
    qty: {
        type: Number,
        required: [true, 'Qty is required']
    },
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('RecipeMaterial', recipeMaterialSchema);