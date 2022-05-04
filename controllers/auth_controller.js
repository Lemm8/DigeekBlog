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
                msg: 'El correo y/o la contraseña son incorrectos, vuelva a intentar'
            })
        }

        if( !usuario.estado ) {
            return res.status( 400 ).json({
                msg: 'El correo y/o la contraseña son incorrectos, vuelva a intentar'
            })
        }

        const validar = bcryptjs.compareSync( contrasena, usuario.contrasena );
        if ( !validar ) {
            return res.status( 400 ).json({
                msg: 'El correo y/o la contraseña son incorrectos, vuelva a intentar'
            })
        }

        const token = await generarJWT( usuario.id );

        return res.status( 200 ).json({
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