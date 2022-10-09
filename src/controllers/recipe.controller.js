const { response, request } = require('express');
const Recipe = require('../models/recipe.model.js')


const recipePost = async (req=request,res=response)=>{
    const body = req.body;
    const recipe = new Recipe(body);

    await recipe.save();

    res.status(200).json({
        msg:'Post API - Recetas post',
        recipe
    })
}

module.exports = {recipePost}