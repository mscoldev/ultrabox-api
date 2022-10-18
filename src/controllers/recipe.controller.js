const { response, request } = require('express');
const Recipe = require('../models/recipe.model.js')


const recipePost = async (req = request, res = response) => {
    //TODO: Usar desestructuracion de  objetos
    const body = req.body;
    console.log(body);
    const recipe = new Recipe(body);

    const recipeSaved = await recipe.save();

    res.status(200).json(
        recipeSaved)
}

module.exports = { recipePost }