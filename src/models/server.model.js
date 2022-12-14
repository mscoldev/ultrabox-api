require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { dbConnection } = require('../database/config.database');
const { pgConnection } = require('../database/config.databasepg');
const { createRoles } = require('../libs/initialSetupDatabase');
const PORT = process.env.PORT || 3000;



const corsOptions = {
    credentials: false,
    preflightContinue: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    origin: "*"
}
class Server {

    constructor() {
        this.app = express();
        this.port = PORT;
        //*PATHS MES

        this.generalPath = '/api/';
        this.authPath = '/api/auth';
        this.recipePath = '/api/recipe';
        this.materialPath = '/api/material';
        this.productionPath = '/api/production';
        this.productionLinePath = '/api/productionline';
        this.rolePath = '/api/role';
        this.typesDocumentPath = '/api/typesDocument';


        //*PATHS SCALE
        this.clientPath = '/api/scale/client';
        this.driverPath = '/api/scale/driver';
        this.originPath = '/api/scale/origin';
        this.productPath = '/api/scale/product';
        this.sitePath = '/api/scale/site';
        this.truckPath = '/api/scale/truck';
        this.registerPath = '/api/scale/register';
        this.destinationPath = '/api/scale/destination';
        this.weightPath = '/api/scale/weight';


        //Conectar a la base de datos
        this.dbInitialize();


        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();



    }

    //* Connect & Initialize Database

    async dbInitialize() {
        await Promise.all([
            pgConnection(),
            dbConnection(),
            createRoles(),
        ])
    }

    // async connectToDatabase (){
    //     await dbConnection();
    // }

    // async initialSetupDatabase (){
    //     await createRoles();
    // }

    middlewares() {

        // CORS
        this.app.use(cors(corsOptions));

        //Morgan
        this.app.use(morgan('dev'));

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() {
        //*ROUTES APP MES

        this.app.use(this.authPath, require('../routes/auth.routes'));
        this.app.use(this.recipePath, require('../routes/mes/recipe.routes'));
        this.app.use(this.materialPath, require('../routes/mes/material.routes'));
        this.app.use(this.productionPath, require('../routes/mes/production.routes'));
        this.app.use(this.productionLinePath, require('../routes/mes/productionLine.routes'));
        this.app.use(this.rolePath, require('../routes/mes/role.routes'));
        this.app.use(this.typesDocumentPath, require('../routes/mes/typesDocument.routes'));


        //*ROUTES APP SCALE

        this.app.use(this.clientPath, require('../routes/scale/client.routes'));
        this.app.use(this.driverPath, require('../routes/scale/driver.routes'));
        this.app.use(this.originPath, require('../routes/scale/origin.routes'));
        this.app.use(this.productPath, require('../routes/scale/product.routes'));
        this.app.use(this.sitePath, require('../routes/scale/site.routes'));
        this.app.use(this.truckPath, require('../routes/scale/truck.routes'));
        this.app.use(this.registerPath, require('../routes/scale/register.routes'));
        this.app.use(this.destinationPath, require('../routes/scale/destination.routes'));
        this.app.use(this.weightPath, require('../routes/scale/weight.routes'));


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port: ', this.port);
        });
    }


}




module.exports = Server;
