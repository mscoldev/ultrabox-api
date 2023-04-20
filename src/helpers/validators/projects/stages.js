const _ = require('lodash');
const PjAcceptance = require('../../../models/projects/acceptance.model');


const updateDynamicAcceptance = async (_id, signatory) => {
    //Obtener los datos del acta
    try {
        //Consultar registro
        const data = await readAcceptanceById(_id);
        console.log({ data });
        //Ultimo estado reportado
        const lastStage = await getLastStageName(data);
        console.log({ lastStage });
        //Evaluar los Stage y actualizar según el Stage
        var updatedAcceptance;
        switch (lastStage) {
            case 'new':
                const updateStepOne = {
                    signatory: {
                        contractor: signatory.contractor
                    },
                    $push: {
                        stage: {
                            name: 'signedByContractor',
                            completed: true
                        }
                    }
                }
                console.log({ updateStepOne });
                updatedAcceptance = await setAcceptanceById(_id, updateStepOne)
                console.log({ updatedAcceptance });
                //Envía un correo al cliente con los datos para actualizar
                break;
            case "signedByContractor":
                const updateStepTwo = {
                    signatory: {
                        client: signatory.client
                    },
                    $push: {
                        stage: {
                            name: 'signedByClient',
                            completed: true
                        }
                    }
                }

                updatedAcceptance = await setAcceptanceById(_id, updateStepTwo)

                //Recibe la firma por parte del cliente y cambia el estado a "signClient"
                if (data.typeAcceptance === 'Parcial') {
                    //El estado se mantiene igual
                    //Se envía correo al gerente de proyecto del contractor para aceptación final.
                } else {
                    //Se empuja el estado de cerrado.
                    const updateStepThree = {
                        $push: {
                            stage: {
                                name: 'closed',
                                completed: true
                            }
                        }
                    }
                    updatedAcceptance = await setAcceptanceById(_id, updateStepThree)
                }
                break;
            case "signedByClient":
                //Se debe enviar una aceptación de los pendientes
                const updateStepThree = {
                    $push: {
                        stage: {
                            name: 'closed',
                            completed: true
                        }
                    }
                }

                updatedAcceptance = await setAcceptanceById(_id, updateStepThree)

                break;
            default:
                console.log("No se encontró ningún stage con ese nombre");
                result = "No se encontró ningún stage con ese nombre"
        }
        return updatedAcceptance;
    } catch (err) {
        return err
    }
}

const setAcceptanceById = async (_id, update) => {
    try {
        console.log(`id para setAccep ${_id}`);
        const updateAcceptance = await PjAcceptance
            .findByIdAndUpdate(_id, update, { new: true });
        if (updateAcceptance != null) {
            return updateAcceptance;
        } else {
            throw boom.notFound(`Oops!, acta con _id:${_id}, no encontrada`)
        }
    } catch (err) {
        return err;
    }
}


const readAcceptanceById = async (_id) => {
    try {
        const acceptance = await PjAcceptance
            .findById(_id);
        if (acceptance != null) {
            return acceptance;
        } else {
            throw boom.notFound(`Oops!, acta con _id:${_id}, no encontrada`)
        }
    } catch (err) {
        return err;
    }
}

const findSomeStageComplete = async (data, someStageName) => {
    // const data = await readAcceptanceById(_id);
    const existingStageComplete = data.stage.some(stageSome => stageSome.name === someStageName && stageSome.completed === true)
    console.log(`Se encontró el estado ${someStageName} completo en el array`);
    const result = existingStageComplete === true ? someStageName : false;
    return result;
}

const updateSelectionStage = async (_id, stage) => {
    //Obtener los datos de la base datos por medio del _id
    const data = await readAcceptanceById(_id);
    //Identifica si el registro cumple con el estado buscado
    const confirmStage = await findSomeStageComplete(data, stage);
    return confirmStage;
}

const getLastStageName = async (data) => {
    const stages = _.orderBy(data.stage, ['date'], ['desc']);
    return stages.length > 0 ? stages[0].name : null;
}


const data = {
    "_id": {
        "$oid": "643c3c15ae1896e1e634dbb7"
    },
    "_codeProjectERP": "PJ2203-0112",
    "_idProjectERP": 32,
    "dateAcceptance": {
        "$date": "2023-01-28T01:00:00Z"
    },
    "serviceObject": "Asistencia tecnica para la instalacion de 5 alarmas",
    "dateInit": {
        "$date": "2023-01-28T01:00:00Z"
    },
    "dateEnd": {
        "$date": "2023-01-28T01:00:00Z"
    },
    "erpRef": {
        "client": {
            "purchaseOrder": "oc123456789"
        },
        "own": {
            "proposal": "OF12334567890"
        }
    },
    "client": {
        "company": "ULTRACEM",
        "Name": "Pedro Perez",
        "Position": "Jefe de Compras",
        "Email": "perdro.perez@prueba.com"
    },
    "controller": {
        "Position": "No especificado"
    },
    "contractor": {
        "Name": "Pedro Perez",
        "Position": "Jefe de Compras",
        "Email": "perdro.perez@prueba.com"
    },
    "deliverables": [{
        "_id": "uuid",
        "description": "Este es entregable 1",
        "compliance": 100,
        "accepted": true
    },
    {
        "_id": "uuid",
        "description": "Este es entregable 2",
        "compliance": 100,
        "accepted": true
    }
    ],
    "citySign": "Barranquilla",
    "officeSign": "el cliente",
    "serviceValue": 5,
    "recommendations": "Estas son nuestras recomendaciones",
    "typeAcceptance": "Total",
    "stage": [{
        "name": "new",
        "date": {
            "$date": "2023-04-16T18:19:01.177Z"
        },
        "completed": false,
        "_id": {
            "$oid": "643c3c15ae1896e1e634dbb8"
        }
    },
    {
        "name": "rejected",
        "date": {
            "$date": "2023-04-16T18:19:01.177Z"
        },
        "completed": true,
        "_id": {
            "$oid": "643c3c15ae1896e1e634dbb8"
        }
    }
    ],
    "_idFiles": [],
    "dateSign": {
        "$date": "2023-04-16T18:19:01.186Z"
    },
    "rejectedMessage": [],
    "createdAt": {
        "$date": "2023-04-16T18:19:01.191Z"
    },
    "updatedAt": {
        "$date": "2023-04-16T18:19:01.191Z"
    }
}


module.exports = { updateDynamicAcceptance, setAcceptanceById, findSomeStageComplete, getLastStageName }