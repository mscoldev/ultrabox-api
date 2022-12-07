const { response, request } = require('express');
const Destination = require('../../models/scale/destination.model');


const getDestinations = async (req = request, res = response) => {
    try {
        const destinations = await Destination.findAll();
        res.status(200).json({
            msg: 'Lista de Destinationes',
            destinations
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


const getDestinationById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const destination = await Destination.findByPk(id);

        if (Destination != null) {
            res.status(200).json({
                msg: 'Información del origen',
                destination
            });
        } else {
            console.log('Not found');
            res.status(200).json({
                msg: 'Origen no encontrado, verifique id'
            });
        }

    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` });
    }
}


const updateDestinationById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { name, enable } = req.body;
        const destinationUpdated = await Destination.findByPk(id);

        if (destinationUpdated != null) {
            console.log('found');
            destinationUpdated.name = name;
            destinationUpdated.enable = enable;

            await destinationUpdated.save();

            res.status(200).json({
                msg: 'Origen actualizado',
                destinationUpdated
            });
        } else {
            console.log('Not found');
            res.status(200).json({
                msg: 'Origen no encontrado, verifique id'
            });
        }

    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` });
    }
}

//TODO: Pendiente Implementar
const deleteDestinationById = async (req = request, res = response) => {
    try {
        const paramsId = req.params.DestinationId;
        const body = { deleted: true }
        const deletedDestination = await Destination.findByIdAndUpdate(paramsId, body);
        if (deletedDestination != null) {
            res.status(200).json({
                msg: 'Destino eliminado Id:' + paramsId
            });
        } else {
            res.status(404).json({
                msg: 'Destino no encontrado, verifique el Id ingresado'
            })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}



const createDestination = async (req = request, res = response) => {
    try {
        const { name } = req.body
        const newDestination = await Destination.create({
            name
        });

        res.status(201).json({
            msg: 'Origen creado satisfactoriamente!',
            newDestination
        })
    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` })
    }

}



module.exports = {
    getDestinations,
    getDestinationById,
    updateDestinationById,
    deleteDestinationById,
    createDestination
}