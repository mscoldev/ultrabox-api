const { response, request } = require('express');
const Material = require('../models/material.model')


const getMaterials = async (req=request,res=response)=>{
    //TODO: Usar desestructuracion de objetos
     const materials = await Material.find();
     res.status(200).json({
         msg:'Lista de recetas',
         materials
     })
 }
 

const materialPost = async (req=request,res=response)=>{
   //TODO: Usar desestructuracion de objetos
    const body = req.body;
    console.log(body);
    const material = new Material(body);

    const materialSaved = await material.save();

    res.status(201).json({
        msg:'Post API - Recetas post',
        materialSaved
    })
}



module.exports = {materialPost, getMaterials}