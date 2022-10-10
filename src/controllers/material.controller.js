const { response, request } = require('express');
const Material = require('../models/material.model')


const materialPost = async (req=request,res=response)=>{
   //TODO: Usar desestructuracion de objetos
    const body = req.body;
    console.log(body);
    const material = new Material(body);

    const materialSaved = await material.save();

    res.status(200).json({
        msg:'Post API - Recetas post',
        materialSaved
    })
}

module.exports = {materialPost}