const { request, response } = require('express');

const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async ( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status( 401 ).json({
            status: 401,
            msg: 'El token no se encuentra en la petición'
        });
    }

    try {

        // VERIFICAR JWT Y OBTENER PAYLOAD ( UID ) 
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // LEER USUARIO CORRESPONDIENTE
        const usuario = await Usuario.findById( uid );

        // SI USUARIO NO EXISTE
        if ( !usuario ) {
            return res.status( 401 ).json({
                msg: 'Token no válido'
            });
        }


        // VERIFICAR SI ESTADO ES TRUE
        if ( !usuario.estado ) {
            return res.status( 401 ).json({
                msg: 'Token no válido'
            });
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        return res.status( 401 ).json({
            status: 401,
            msg: 'Token no válido',
            error
        });
    }

}

module.exports = {
    validarJWT
}