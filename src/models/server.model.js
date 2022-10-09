const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.API_PORT_SERVER;
        this.pkg = 
        this.userPath = '/api/users';
        this.generalPath = '/api/';

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

    }

    middlewares() {

        // CORS
        this.app.use( cors() );
        
        //Morgan
        this.app.use(morgan('dev'));

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.userPath, require('../routes/user.routes'));
        // this.app.use( this.generalPath, require('../routes/api.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running on port: ', this.port );
        });
    }
    
    getPkg(pkg){
        this.app.pkg = this.app.set('pkg',pkg)
    }

}




module.exports = Server;
