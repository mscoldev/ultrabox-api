const { response, request } = require('express');
const Client = require('../../models/scale/client.model');


const getClients = async (req = request, res = response) => {
    try {
        const clients = await Client.findAll({ "enabled": false });
        res.status(200).json({
            msg: 'Lista de clientes',
            clients
        })
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


const getClientById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const client = await Client.findByPk(id);

        if (client != null) {
            res.status(200).json({
                msg: 'Información del cliente',
                client
            });
        } else {
            console.log('Not found');
            res.status(200).json({
                msg: 'Cliente no encontrado, verifique id'
            });
        }

    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` });
    }
}


const updateClientById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { name, nit, enable } = req.body;
        const clientUpdated = await Client.findByPk(id);

        if (clientUpdated != null) {
            console.log('found');
            clientUpdated.name = name;
            clientUpdated.nit = nit;
            clientUpdated.enable = enable;

            await clientUpdated.save();

            res.status(200).json({
                msg: 'Cliente actualizado',
                clientUpdated
            });
        } else {
            console.log('Not found');
            res.status(200).json({
                msg: 'Cliente no encontrado, verifique id'
            });
        }

    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` });
    }
}

//TODO: Pendiente Implementar
const deleteClientById = async (req = request, res = response) => {
    try {
        const paramsId = req.params.driversId;
        const body = { deleted: true }
        const deleteddrivers = await drivers.findByIdAndUpdate(paramsId, body);
        if (deleteddrivers != null) {
            res.status(200).json({
                msg: 'drivers eliminado Id:' + paramsId
            });
        } else {
            res.status(404).json({
                msg: 'drivers no encontrado, verifique el Id ingresado'
            })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}



const createClient = async (req = request, res = response) => {
    try {
        const { name, nit } = req.body
        const newClient = await Client.create({
            name,
            nit,
        });
        res.status(201).json({
            msg: 'Cliente creado satisfactoriamente!',
            newClient
        })
    } catch (err) {
        return res.status(500).json({ message: `Se ha producido un error, ${err.message}` })
    }

}



module.exports = {
    getClients,
    getClientById,
    updateClientById,
    deleteClientById,
    createClient
}