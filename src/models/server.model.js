require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { logErrors, errorHandler, boomErrorHandler } = require('../middlewares/error.handler');
require('../helpers/auth')
const { dbConnection } = require('../database/config.database');
const { pgConnection } = require('../database/config.databasepg');
const { createRoles, createInitialConfApp } = require('../libs/initialSetupDatabase');
const PORT = process.env.PORT || 3000;

const uploadPath = path.join(__dirname, '..', '..', 'uploads');
const staticUrl = path.join(__dirname, '../public');

const corsOptions = {
  credentials: false,
  preflightContinue: false,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  optionsSuccessStatusCode: 204,
  origin: '*'
}
class Server {

  constructor() {
    this.app = express();
    this.port = PORT;


    this.paths = {
      //*PATHS MES
      conf: '/api/conf',
      auth: '/api/auth',
      recipe: '/api/recipe',
      material: '/api/material',
      production: '/api/production',
      productionLine: '/api/productionline',
      role: '/api/role',
      typesDocument: '/api/typesDocument',
      productionLog: '/api/mes/productionLog',
      location: '/api/mes/location',
      scheduling: '/api/mes/scheduling',
      tools: '/api/mes/tools',


      //*PATHS MES - GRAFICOS
      graf: '/api/mes/graf',


      //*PATHS SCALE
      client: '/api/scale/client',
      driver: '/api/scale/driver',
      origin: '/api/scale/origin',
      product: '/api/scale/product',
      site: '/api/scale/site',
      truck: '/api/scale/truck',
      register: '/api/scale/register',
      destination: '/api/scale/destination',
      weight: '/api/scale/weight',

      //*PATHS PROJECTS
      project: '/api/project',

      //*PATHS GENERALS
      file: '/api/file'

    }

    //Conectar a la base de datos
    this.dbInitialize();


    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();

    this.middlewaresErrors();

  }

  //* Connect & Initialize Database

  async dbInitialize() {
    await Promise.all([
      // pgConnection(),
      dbConnection(),
      createRoles(),
      createInitialConfApp()
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

    // this.app.use('/', express.static(process.cwd() + '/src/public'));

    //Morgan
    this.app.use(morgan('dev'));

    // Lectura y parseo del body
    this.app.use(express.json());

    // Contenido Statico

    this.app.use('/uploads', express.static(uploadPath));
    console.log(staticUrl);
    console.log(uploadPath);

    // this.app.use(fileUpload({
    //     useTempFiles: true,
    //     tempFileDir: '/tmp/'
    // }));

  }

  middlewaresErrors() {
    //Error Handler
    this.app.use(logErrors);
    this.app.use(boomErrorHandler);
    this.app.use(errorHandler);
  }

  routes() {
    //*ROUTES APP MES
    this.app.use(this.paths.conf, require('../routes/conf.routes'));

    this.app.use(this.paths.auth, require('../routes/auth.routes'));
    this.app.use(this.paths.recipe, require('../routes/mes/recipe.routes'));
    this.app.use(this.paths.material, require('../routes/mes/material.routes'));
    this.app.use(this.paths.production, require('../routes/mes/production.routes'));
    this.app.use(this.paths.productionLine, require('../routes/mes/productionLine.routes'));
    this.app.use(this.paths.role, require('../routes/mes/role.routes'));
    this.app.use(this.paths.typesDocument, require('../routes/mes/typesDocument.routes'));
    this.app.use(this.paths.productionLog, require('../routes/mes/productionLogs.routes'));
    this.app.use(this.paths.location, require('../routes/mes/location.routes'));
    this.app.use(this.paths.scheduling, require('../routes/mes/scheduling.routes'));
    this.app.use(this.paths.tools, require('../routes/tools/units.routes'));

    //*ROUTES APP MES - GRAFICOS

    this.app.use(this.paths.graf, require('../routes/mes/query/graf.routes'));


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

    //*ROUTES APP PROJECT

    this.app.use(this.paths.project, require('../routes/projects/projects.routes'));

    //*ROUTER GENERAL
    this.app.use(this.paths.file, require('../routes/files.routes'));

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running on port: ', this.port);
    });
  }


}




module.exports = Server;