const { response, request } = require('express');

const Comentario = require('../models/comentario');
const Post = require('../models/post');
const Usuario = require('../models/usuario');

const getComentarios = async ( req = request, res = response ) => {
    try {
        
        let { limit, offset, titulo, comentario, usuario } = req.query;

        if ( !limit ) {
            limit = 10
        }

        if ( !offset ) {
            offset = 0
        }

        let where = {
            estado: true,
            ...( titulo && { titulo } ),
            ...( comentario && { ComentarioId: Comentario } ),
            ...( usuario && { UsuarioId: usuario } ),
        }

        const comentarios = await Comentario.findAndCountAll({
            limit,
            offset,            
            where,
        })

        if ( comentarios.count === 0 ) {
            return res.status( 404 ).json({
                status: 404,
                msg: 'No hay registros de comentarios en la base de datos'
            });
        }

        return res.status( 200 ).json({
            status: 200,
            comentarios
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

        const comentario = await Comentario.findOne( {
            include: [{
                model: Post,
                as: 'Post',
                required: true
            }, {
                model: Usuario,
                as: 'Usuario',
                required: true 
            }],
            where: {
                id,
                estado: true
            }
        });
        
        return res.status( 200 ).json({
            status: 200,
            comentario
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

        const createdComentario = await Comentario.create( 
            body, {
                include: [{
                    model: Post,
                    as: 'Post',
                    required: true
                }, {
                    model: Usuario,
                    as: 'Usuario',
                    required: true 
                }]
            }
        );

        const comentario = await Comentario.findByPk( createdComentario.id );

        return res.status( 200 ).json({
            status: 200,
            msg: 'Comentario creado',
            comentario
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
        const { contenido } = req.body;

        const comentario = await Comentario.findOne( { 
            where: { 
                id,
                estado: true
            } 
        });

        if ( contenido ) comentario.contenido = contenido;

        const updateComentario = await comentario.save();        

        return res.status( 200 ).json({
            status: 200,
            msg: 'Comentario actualizado',
            updateComentario
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

        const comentario = await Comentario.findOne( { 
            where: { 
                id,
                estado: true
            } 
        });

        comentario.estado = false;

        const updateComentario = await comentario.save();        

        return res.status( 200 ).json({
            status: 200,
            msg: 'Comentario eliminado',
            updateComentario
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