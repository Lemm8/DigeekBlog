const Usuario = require('../models/usuario');
const Area = require('../models/area');
const Comentario = require('../models/comentario');
const Post = require('../models/post');

const existeCorreo = async ( correo = '' ) => {
    const existeCorreo = await Usuario.findOne( {
        where: {
            correo,
            estado: true
        }
    });

    if ( existeCorreo ) {
        throw new Error( `Ya hay un usuario registrado con este correo: '${ correo }'` );
    }
}

const existeUsuario = async ( id ) => {
    const existeUsuario = await Usuario.findOne( {
        where: {
            id,
            estado: true
        }
    });

    if ( !existeUsuario ) {
        throw new Error( `No existe un usuario con este id: ${ id }` );
    }
}


const existeArea = async ( id = '' ) => {
    const existeArea = await Area.findOne({
        where: {
            id,
            estado: true
        }
    });
    if( !existeArea ) {
        throw new Error( `No existe un área con este id: ${ id }` );
    }
}


const existePost = async ( id = '' ) => {
    const existePost = await Post.findOne({
        where: {
            id,
            estado: true
        }
    });
    if( !existePost ) {
        throw new Error( `No existe un post con este id: ${ id }` );
    }
}


const existeComentario = async ( id = '' ) => {
    const existeComentario = await Comentario.findOne({
        where: {
            id,
            estado: true
        }
    });
    if( !existeComentario ) {
        throw new Error( `No existe un comentario con este id: ${ id }` );
    }
}


module.exports = {
    existeCorreo,
    existeUsuario,
    existeArea,
    existeComentario,
    existePost
}