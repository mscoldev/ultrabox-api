const { response, request } = require('express');
const RecipeMaterial = require('../models/recipeMaterial.model')


const recipeMaterialCreate = async (req = request, res = response) => {
    try {
        const body = req.body;
        console.log(body);
        const recipeMaterial = new RecipeMaterial(body);

        const recipeMaterialSaved = await recipeMaterial.save();

        res.status(200).json(
            recipeMaterialSaved)
    } catch (error) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { recipeMaterialCreate }