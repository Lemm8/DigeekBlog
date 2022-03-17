const { response, request } = require('express');

const Comentario = require('../models/comentario');

const getComentarios = async ( req = request, res = response ) => {
    try {
        
        return res.status( 200 ).json({
            status: 200,
            msg: 'GET - Comentarios'
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

const getComentario = async ( req = request, res = response ) => {
    try {
        
        const { id } = req.params;

        return res.status( 200 ).json({
            status: 200,
            msg: `GET - Comentario ${ id }`
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

const postComentario = async ( req = request, res = response ) => {
    try {
        
        const { body } = req;

        return res.status( 200 ).json({
            status: 200,
            msg: 'POST - Comentario',
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

const putComentario = async ( req = request, res = response ) => {
    try {
        
        const { id } = req.params;
        const { body } = req;

        return res.status( 200 ).json({
            status: 200,
            msg: `PUT - Comentario ${ id } `,
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

const deleteComentario = async ( req = request, res = response ) => {
    try {

        const { id } = req.params;
        
        return res.status( 200 ).json({
            status: 200,
            msg: `DELETE - Comentario ${ id }`
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

    getComentarios,
    getComentario,
    postComentario,
    putComentario,
    deleteComentario

}