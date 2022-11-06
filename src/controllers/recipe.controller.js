const { response, request } = require('express');
const Recipe = require('../models/recipe.model');


const getRecipe = async (req = request, res = response) => {
    try {
        const recipes = await Recipe.find({ "deleted": false })
            .populate(
                {
                    path: '_idRecipeMaterials',
                    select: { qty: 1, _id: 0 },
                    populate:
                    {
                        path: '_idMaterial',
                        select: { name: 1, type: 1, ppm: 1, density: 1, _id: 0 },
                    }
                });
        res.status(200).json({
            msg: 'List of recipes',
            recipes
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const recipePost = async (req = request, res = response) => {
    try {
        //TODO: Usar desestructuracion de  objetos
        const body = req.body;
        console.log(body);
        const recipe = new Recipe(body);

        const recipeSaved = await recipe.save();

        res.status(200).json(
            recipeSaved)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { recipePost, getRecipe }