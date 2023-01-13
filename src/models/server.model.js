require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

const { cache } = require('../middlewares/cacheResponse');

const { dbConnection } = require('../database/config.database');
const { pgConnection } = require('../database/config.databasepg');
const { createRoles } = require('../libs/initialSetupDatabase');
const { relativeTimeThreshold } = require('moment');
const PORT = process.env.PORT || 3000;



const corsOptions = {
    credentials: false,
    preflightContinue: false,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    optionsSuccessStatusCode: 204,
    origin: "*"
}
class Server {

    constructor() {
        this.app = express();
        this.port = PORT;


        this.paths = {
            //*PATHS MES
            auth: '/api/auth',
            recipe: '/api/recipe',
            material: '/api/material',
            production: '/api/production',
            productionLine: '/api/productionline',
            role: '/api/role',
            typesDocument: '/api/typesDocument',
            //*PATHS SCALE
            client: '/api/scale/client',
            driver: '/api/scale/driver',
            origin: '/api/scale/origin',
            product: '/api/scale/product',
            site: '/api/scale/site',
            truck: '/api/scale/truck',
            register: '/api/scale/register',
            destination: '/api/scale/destination',
            weight: '/api/scale/weight'

        }

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

        console.log(process.cwd());

        this.app.use('/', express.static(process.cwd() + '/src/public'));

        this.app.use(cache('1 minutes', ((req, res) => req.method === "GET")));

        //Morgan
        this.app.use(morgan('dev'));

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público

        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }));

    }

    routes() {
        //*ROUTES APP MES

        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.recipe, require('../routes/mes/recipe.routes'));
        this.app.use(this.paths.material, require('../routes/mes/material.routes'));
        this.app.use(this.paths.production, require('../routes/mes/production.routes'));
        this.app.use(this.paths.productionLine, require('../routes/mes/productionLine.routes'));
        this.app.use(this.paths.role, require('../routes/mes/role.routes'));
        this.app.use(this.paths.typesDocument, require('../routes/mes/typesDocument.routes'));


        //*ROUTES APP SCALE

        this.app.use(this.paths.client, require('../routes/scale/client.routes'));
        this.app.use(this.paths.driver, require('../routes/scale/driver.routes'));
        this.app.use(this.paths.origin, require('../routes/scale/origin.routes'));
        this.app.use(this.paths.product, require('../routes/scale/product.routes'));
        this.app.use(this.paths.site, require('../routes/scale/site.routes'));
        this.app.use(this.paths.truck, require('../routes/scale/truck.routes'));
        this.app.use(this.paths.register, require('../routes/scale/register.routes'));
        this.app.use(this.paths.destination, require('../routes/scale/destination.routes'));
        this.app.use(this.paths.weight, require('../routes/scale/weight.routes'));


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port: ', this.port);
        });
    }


}




module.exports = Server;
