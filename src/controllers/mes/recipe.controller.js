const { response, request } = require('express');
const Recipe = require("../../models/recipe.model");
const jsonata = require('jsonata');


const getRecipe = async (req = request, res = response) => {
    try {
        const recipesComplete = await getRecipesToDatabase()
        const recipes = await JSONataExpression(recipesComplete)
        res.status(200).json({
            msg: 'Lista de recetas',
            recipes,
            recipesComplete
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

const deleteRecipeById = async (req = request, res = response) => {
    try {
        const paramsId = req.params.recipeId;
        const body = { deleted: true }
        const deletedRecipe = await Recipe.findByIdAndUpdate(paramsId, body);
        if (deletedRecipe != null) {
            res.status(202).json({
                msg: 'Receta eliminada Id:' + paramsId
            });
        } else {
            res.status(404).json({
                msg: 'Material no encontrado, verifique el Id ingresado'
            })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

//get Data to database mongo.
const getRecipesToDatabase = async () => {
    try {
        const recipes = await Recipe.find({ "deleted": false })
            .populate({ path: 'ingredients._idMaterial', select: { name: 1, _id: 1, type: 1, deleted: 1, erp_code: 1, id_controller: 1 } })
            .populate({ path: 'productionLineUse', select: { name: 1 } })
            .exec();
        return recipes;
    } catch (err) {
        message: err.message
    }
}

//Function - List recipe apply a JSONata Expression
const JSONataExpression = async (dataPromise) => {
    const queryJSONata = `[$.{"id":_id,"name":name,"erp_code":erp_code,"id_controller":id_controller,"temp":temp,"deleted":deleted,
        "productionLineUse":[productionLineUse.$.{"_id":_id,"name":name}],
        "ingredients":[ingredients.$.{"_idIngredient":_id,"_idMaterial":_idMaterial._id,"name":_idMaterial.name,"id_controller":_idMaterial.id_controller,"type":_idMaterial.type,"deleted":_idMaterial.deleted,"qty":qty}]}]`;
    const expression = jsonata(queryJSONata);

    const result = expression.evaluate(dataPromise);
    return result;
}


module.exports = { createRecipe, getRecipe, updateRecipe, deleteRecipeById }