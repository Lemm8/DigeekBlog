const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');

const login = async( req = request, res = response )  => {

    const { correo, contrasena } = req.body

    try {
        const usuario = await Usuario.findOne({
            where: {
                correo
            }
        });
        if ( !usuario ) {
            return res.status( 400 ).json({
                status: 400,                
                field: 'correo',
                msg: `No se encontro un usuario con este correo ${ correo }, vuelva a intentar`
            })
        }

        if( !usuario.estado ) {
            return res.status( 400 ).json({
                status: 400,                
                field: 'correo',
                msg: `No se encontro un usuario con este correo ${ correo }, vuelva a intentar`
            })
        }

        const validar = bcryptjs.compareSync( contrasena, usuario.contrasena );
        if ( !validar ) {
            return res.status( 400 ).json({
                status: 400,
                field: 'contrasena',
                msg: 'La contraseña es incorrecta, vuelva a intentar'
            })
        }

        const token = await generarJWT( usuario.id );

        return res.status( 200 ).json({
            status: 200,
            usuario, 
            token
        });

    } catch (error) {
        return res.status( 500 ).json( {
            msg: "Problema en el servidor",
            error
        });
    }

}

module.exports = {
    login
}