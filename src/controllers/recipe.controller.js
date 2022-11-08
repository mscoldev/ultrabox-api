const { response, request } = require('express');
const { Recipe, Ingredient } = require('../models/recipe.model');


const getRecipe = async (req = request, res = response) => {
    try {
        const recipes = await Recipe.find({ "deleted": false })
            .populate({ path: 'ingredients._idMaterial', select: { name: 1, _id: 0 } });
        // .populate(
        //     {
        //         path: '_idRecipeMaterials',
        //         select: { qty: 1, _id: 0 },
        //         populate:
        //         {
        //             path: '_idMaterial',
        //             select: { name: 1, type: 1, ppm: 1, density: 1, _id: 0 },
        //         }
        //     });
        res.status(200).json({
            msg: 'List of recipes',
            recipes
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const createRecipe = async (req = request, res = response) => {
    try {
        //TODO: Usar desestructuracion de  objetos
        const body = req.body;
        const recipe = new Recipe(body)
        const { ingredients, ...tempRecipe } = body;
        // const recipe = new Recipe(tempRecipe);
        // recipe.ingredients.push(ingredients);
        const recipeSaved = await recipe.save();

        res.status(200).json(
            recipeSaved)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateRecipe = async (req = request, res = response) => {
    try {
        const paramsId = req.params.recipeId;
        const body = req.body;
        const updatedRecipe = await Recipe.findByIdAndUpdate(paramsId, body, { new: true });
        if (updatedRecipe != null) {
            res.status(200).json({
                msg: 'Receta actualizada por Id',
                updatedRecipe
            });
        } else {
            res.status(404).json({
                msg: 'Receta no encontrada, verifique el Id ingresado'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = { createRecipe, getRecipe, updateRecipe }