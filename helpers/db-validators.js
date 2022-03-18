const Usuario = require('../models/usuario');

const existeCorreo = async ( correo = '' ) => {
    const existeCorreo = await Usuario.findOne( {
        where: {
            correo
        }
    });

    if ( existeCorreo ) {
        throw new Error( `Ya hay un usuario registrado con este correo: '${ correo }'` );
    }
}

const existeUsuario = async ( id ) => {
    const existeUsuario = await Usuario.findOne( {
        where: {
            id
        }
    });

    if ( !existeUsuario ) {
        throw new Error( `No existe un usuario con este id: ${ id }` );
    }
}

module.exports = {
    existeCorreo,
    existeUsuario
}