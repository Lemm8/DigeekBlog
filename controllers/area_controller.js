const { response, request } = require('express');

const Area = require('../models/area');

const getAreas = async ( req = request, res = response ) => {
    try {
        
        return res.status( 200 ).json({
            status: 200,
            msg: 'GET - Areas'
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

const getArea = async ( req = request, res = response ) => {
    try {
        
        const { id } = req.params;

        return res.status( 200 ).json({
            status: 200,
            msg: `GET - Area ${ id }`
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

const postArea = async ( req = request, res = response ) => {
    try {
        
        const { body } = req;

        return res.status( 200 ).json({
            status: 200,
            msg: 'POST - Area',
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

const putArea = async ( req = request, res = response ) => {
    try {
        
        const { id } = req.params;
        const { body } = req;

        return res.status( 200 ).json({
            status: 200,
            msg: `PUT - Area ${ id } `,
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

const deleteArea = async ( req = request, res = response ) => {
    try {

        const { id } = req.params;
        
        return res.status( 200 ).json({
            status: 200,
            msg: `DELETE - Area ${ id }`
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

    getAreas,
    getArea,
    postArea,
    putArea,
    deleteArea

}