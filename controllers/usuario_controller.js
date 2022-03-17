const { response, request } = require('express');

const Usuario = require('../models/usuario');

const getUsuarios = async ( req = request, res = response ) => {
    try {
        
        return res.status( 200 ).json({
            status: 200,
            msg: 'GET - Usuarios'
        });

    } catch (error) {
        console.log( error );
        return res.status( 500 ).send({
            status: 500,
            msg: 'Error en el servidor',
            error
        });
    }
}

const getUsuario = async ( req = request, res = response ) => {
    try {
        
        const { id } = req.params;

        return res.status( 200 ).json({
            status: 200,
            msg: `GET - Usuario ${ id }`
        });

    } catch (error) {
        console.log( error );
        return res.status( 500 ).json({
            status: 500,
            msg: 'Error en el servidor',
            error
        });
    }
}

const postUsuario = async ( req = request, res = response ) => {
    try {
        
        const { body } = req;

        return res.status( 200 ).json({
            status: 200,
            msg: 'POST - Usuario',
            body
        });

    } catch (error) {
        console.log( error );
        return res.status( 500 ).json({
            status: 500,
            msg: 'Error en el servidor',
            error
        });
    }
}

const putUsuario = async ( req = request, res = response ) => {
    try {
        
        const { id } = req.params;
        const { body } = req;

        return res.status( 200 ).json({
            status: 200,
            msg: `PUT - Usuario ${ id } `,
            body
        });

    } catch (error) {
        console.log( error );
        return res.status( 500 ).json({
            status: 500,
            msg: 'Error en el servidor',
            error
        });
    }
}

const deleteUsuario = async ( req = request, res = response ) => {
    try {

        const { id } = req.params;
        
        return res.status( 200 ).json({
            status: 200,
            msg: `DELETE - Usuario ${ id }`
        });

    } catch (error) {
        console.log( error );
        return res.status( 500 ).json({
            status: 500,
            msg: 'Error en el servidor',
            error
        });
    }
}


module.exports = {

    getUsuarios,
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario

}