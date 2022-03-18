const { response, request } = require('express');

const Usuario = require('../models/usuario');

const getUsuarios = async ( req = request, res = response ) => {
    try {
        
        let { limit, offset } = req.query;

        if ( !limit ) {
            limit = 10
        }

        if ( !offset ) {
            offset = 0
        }

        const usuarios = await Usuario.findAndCountAll({
            limit,
            offset,
            where: {
                estado: true
            }
        })

        return res.status( 200 ).json({
            status: 200,
            usuarios
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

        const usuario = await Usuario.findOne( {
            where: {
                id,
                estado: true
            }
        });

        if ( !usuario ) {
            return res.status( 404 ).json({
                status: 404,
                msg: `No se encontro un usuario con el id ${id }`
            })
        }        

        return res.status( 200 ).json({
            status: 200,
            usuario
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

        const usuario = await Usuario.create( body );

        return res.status( 200 ).json({
            status: 200,
            msg: 'Usuario creado',
            usuario
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
        const { nombre, apellidos } = req.body;

        const usuario = await Usuario.findOne( { 
            where: { 
                id,
                estado: true
            } 
        });

        if ( !usuario ) {
            return res.status( 404 ).json({
                status: 404,
                msg: `No se encontro un usuario con el id ${id }`
            })
        }   

        if ( nombre ) usuario.nombre = nombre;
        if ( apellidos ) usuario.apellidos = apellidos;

        const updateUsuario = await usuario.save();        

        return res.status( 200 ).json({
            status: 200,
            updateUsuario
        });

    } catch ( error ) {
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

        const usuario = await Usuario.findOne( { 
            where: { 
                id,
                estado: true
            } 
        });

        if ( !usuario ) {
            return res.status( 404 ).json({
                status: 404,
                msg: `No se encontro un usuario con el id ${id }`
            })
        }   

        usuario.estado = false;

        const updateUsuario = await usuario.save();        

        return res.status( 200 ).json({
            status: 200,
            msg: 'Usuario eliminado',
            updateUsuario
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