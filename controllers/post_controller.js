const { response, request } = require('express');

const Post = require('../models/post');

const getPosts = async ( req = request, res = response ) => {
    try {
        
        return res.status( 200 ).json({
            status: 200,
            msg: 'GET - Posts'
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

        return res.status( 200 ).json({
            status: 200,
            msg: `GET - Post ${ id }`
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

        return res.status( 200 ).json({
            status: 200,
            msg: 'POST - Post',
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

const putPost = async ( req = request, res = response ) => {
    try {
        
        const { id } = req.params;
        const { body } = req;

        return res.status( 200 ).json({
            status: 200,
            msg: `PUT - Post ${ id } `,
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

const deletePost = async ( req = request, res = response ) => {
    try {

        const { id } = req.params;
        
        return res.status( 200 ).json({
            status: 200,
            msg: `DELETE - Post ${ id }`
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