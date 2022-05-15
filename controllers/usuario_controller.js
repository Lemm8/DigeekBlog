const { response, request } = require('express');
const Sequelize = require( "sequelize" );
const Op = Sequelize.Op;
const fs = require('fs');

const Usuario = require('../models/usuario');

const getUsuarios = async ( req = request, res = response ) => {
    try {
        
        let { limit, offset, correo, nombre, apellidos } = req.query;

        if ( !limit ) {
            limit = 10
        }

        if ( !offset ) {
            offset = 0
        }

        let where = {
            estado: true,
            ...( correo && { correo: { [ Op.like ]: `%${ correo }%` } } ),
            ...( nombre && { nombre: { [ Op.like ]: `%${ nombre }%` } } ),
            ...( apellidos && { apellidos: { [ Op.like ]: `%${ apellidos }%` } } )
        }

        const usuarios = await Usuario.findAndCountAll({
            limit,
            offset,
            where
        })

        if ( usuarios.count === 0 ) {
            return res.status( 404 ).json({
                status: 404,
                msg: 'No se encontraron usuarios'
            });
        }

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
        
        const { avatar, twitter, permiso, ...body } = req.body;

        if ( permiso === process.env.POST_USER_PASSWORD ) {

            const usuario = await Usuario.create( body );

            const autor = `---
name: ${body.nombre}
email: ${body.correo}
${ avatar ? `avatar: ${avatar}` : '' }
${ twitter ? `twitter: ${twitter}` : '' }
---`;
    
            fs.writeFileSync( `${process.env.BASE_DIR}/authors/${body.nombre}.md`, autor );

            return res.status( 200 ).json({
                status: 200,
                msg: 'Usuario creado',
                usuario
            });
        } else {
            return res.status( 400 ).json({
                status: 400,
                msg: 'Contraseña incorrecta, vuelva a intentarlo',
            });
        }



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

        if ( nombre ) usuario.nombre = nombre;
        if ( apellidos ) usuario.apellidos = apellidos;

        const updateUsuario = await usuario.save();        

        return res.status( 200 ).json({
            status: 200,
            msg: 'Usuario actualizado',
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