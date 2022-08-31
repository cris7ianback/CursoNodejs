import express from 'express';
import cors from 'cors';

import { router } from '../routes/usuario.routes.js'
import { routerAuth } from '../routes/auth.routes.js'
import { dbConnection } from '../database/config.js';
import { routerCategoria } from '../routes/categorias.routes.js';


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths ={
            authPath : '/api/auth',
            categoriasPath: '/api/categorias',
            usuariosPath: '/api/usuarios'
        }
        
        // this.usuariosPath   = '/api/usuarios';
        // this.authPath       = '/api/auth';
        // this.categoriasPath = '/api/categorias';

        
        //conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de la aplicación.
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {

        //CORS
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json())

        //Directorio Público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.authPath, routerAuth);
        this.app.use(this.paths.categoriasPath, routerCategoria)
        this.app.use(this.paths.usuariosPath, router);

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}


export {

    Server

}