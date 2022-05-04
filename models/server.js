const cors = require('cors')
const express = require('express');
const db = require('../db/connection');
require('../db/relations');

const usuariosRoute = require('../routes/usuario_route')
const postsRoute = require('../routes/post_route');
const comentariosRoute = require('../routes/comentario_route');
const areasRoute = require('../routes/area_route');
const authRoute = require('../routes/auth_route')

class Server {
    
    constructor() {
        // CUANDO SE INSTANCIE EL SERVIDOR, CREAR APP DE EXPRESS COMO PROPIEDAD
        this.app = express();
        // PUERTO
        this.port = process.env.PORT;
        // RUTAS
        this.apiPaths = {
            usuarios: '/api/usuarios',
            posts: '/api/posts',
            comentarios: '/api/comentarios',
            areas: '/api/areas',
            auth: '/api/auth',
        }        
        // CONEXIÓN CON BD
        this.conectarDB();

        // MIDDLEWARES (FUNCIONES QUE AÑADEN FUNCIONACLIDADES AL SERVER, SE EJCUTAN SIEMPRE QUE SE LEVANTE EL SERVER)
        this.middlewares();


        // ESTABLECER RUTAS
        this.routes();
    }


    async conectarDB() {
        try {
            
            await db.authenticate();
            // await db.sync( { force: true } );
            console.log( 'Database online' );

        } catch ( error ) {
            throw new Error( error );
        }        
    }



    middlewares() {

        //CORS
        this.app.use( cors() );
        // PARSEO Y LECTURA DEL BODY
        this.app.use( express.json() );
        // DIRECTORIO PÚBLICO
        this.app.use( express.static( 'public' ) );

    }


    // RUTAS DEL SERVIDOR
    routes() {
        
        this.app.use( this.apiPaths.usuarios, usuariosRoute );
        this.app.use( this.apiPaths.comentarios, comentariosRoute );
        this.app.use( this.apiPaths.posts, postsRoute );
        this.app.use( this.apiPaths.areas, areasRoute );
        this.app.use( this.apiPaths.auth, authRoute );

    }

    // PUERTO DONDE SE VA A ESUCHAR
    listen() {
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en el puerto ', this.port );
        });
    }

}

module.exports = Server;