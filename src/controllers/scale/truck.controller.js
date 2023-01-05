const { response, request } = require('express');
const Truck = require('../../models/scale/truck.model');


const getTrucks = async (req = request, res = response) => {
    try {
        const trucks = await Truck.findAll({ where: { enabled: true } });
        res.status(200).json({
            msg: 'Lista de vehiculos',
            trucks
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


const getTruckById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const truck = await Truck.findByPk(id);
        if (truck != null) {
            res.status(200).json({
                msg: 'Información del Vehiculo',
                truck
            });
        } else {
            console.log('Not found');
            res.status(200).json({
                msg: 'Vehiculo no encontrado, verifique id'
            });
        }

    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` });
    }
}


const updateTruckById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { numberPlate, model, color, truckName, enable } = req.body;
        const newTruck = await Truck.findByPk(id);

        if (newTruck != null) {
            console.log('found');

            newTruck.numberPlate = numberPlate;
            newTruck.model = model;
            newTruck.color = color;
            newTruck.truckName = truckName;
            newTruck.enable = enable;

            await newTruck.save();

            res.status(200).json({
                msg: 'Origen actualizado',
                newTruck
            });
        } else {
            console.log('Not found');
            res.status(200).json({
                msg: 'Trucko no encontrado, verifique id'
            });
        }

    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` });
    }
}


const deleteTruckById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const deletedTruck = await Truck.findByPk(id);
        if (deletedTruck != null) {

            deletedTruck.enabled = false;
            deletedTruck.save();

            res.status(202).json({
                msg: `Vehiculo con Id: ${id}, eliminado.`
            });
        } else {
            res.status(404).json({
                msg: `El vehiculo con Id: ${id}, no encontrado, verifique el Id.`
            })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}


const createTruck = async (req = request, res = response) => {
    try {
        const { numberPlate, model, color, enable } = req.body;

        const newTruck = await Truck.create({
            numberPlate, model, color, enable
        });

        res.status(201).json({
            msg: 'Origen creado satisfactoriamente!',
            newTruck
        })
    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` })
    }

}



module.exports = {
    getTrucks,
    getTruckById,
    updateTruckById,
    deleteTruckById,
    createTruck
}