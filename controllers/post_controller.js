const { response, request } = require('express');

const Post = require('../models/post');
const Area = require('../models/Area');
const Usuario = require('../models/usuario');

const getPosts = async ( req = request, res = response ) => {
    try {
        
        let { limit, offset, titulo, area, usuario } = req.query;

        if ( !limit ) {
            limit = 10
        }

        if ( !offset ) {
            offset = 0
        }

        let where = {
            estado: true,
            ...( titulo && { titulo } ),
            ...( area && { AreaId: area } ),
            ...( usuario && { UsuarioId: usuario } ),
        }

        const posts = await Post.findAndCountAll({
            limit,
            offset,            
            where,
        })

        if ( posts.count === 0 ) {
            return res.status( 404 ).json({
                status: 404,
                msg: 'No hay registros de Areas en la base de datos'
            });
        }

        return res.status( 200 ).json({
            status: 200,
            posts
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

const getPost = async ( req = request, res = response ) => {
    try {
        
        const { id } = req.params;

        const area = await Post.findOne( {
            include: [{
                model: Area,
                as: 'Area',
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
            area
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

const postPost = async ( req = request, res = response ) => {
    try {
        
        const { body } = req;

        const createdPost = await Post.create( 
            body, {
                include: [{
                    model: Area,
                    as: 'Area',
                    required: true
                }, {
                    model: Usuario,
                    as: 'Usuario',
                    required: true 
                }]
            }
        );

        const post = await Post.findByPk( createdPost.id );

        return res.status( 200 ).json({
            status: 200,
            msg: 'Post creado',
            post
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

const putPost = async ( req = request, res = response ) => {
    try {
        
        const { id } = req.params;
        const { titulo, contenido, imagen } = req.body;

        const post = await Post.findOne( { 
            where: { 
                id,
                estado: true
            } 
        });

        if ( titulo ) post.titulo = titulo;
        if ( contenido ) post.contenido = contenido;
        if ( imagen ) post.imagen = imagen;

        const updatePost = await post.save();        

        return res.status( 200 ).json({
            status: 200,
            msg: 'Post actualizado',
            updatePost
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

const deletePost = async ( req = request, res = response ) => {
    try {

        const { id } = req.params;

        const post = await Post.findOne( { 
            where: { 
                id,
                estado: true
            } 
        });

        post.estado = false;

        const updatePost = await post.save();        

        return res.status( 200 ).json({
            status: 200,
            msg: 'Post eliminado',
            updatePost
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

    getPosts,
    getPost,
    postPost,
    putPost,
    deletePost

}