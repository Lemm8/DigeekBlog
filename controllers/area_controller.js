const { response, request } = require('express');
const Sequelize = require( "sequelize" );
const Op = Sequelize.Op;

const Area = require('../models/Area');

const getAreas = async ( req = request, res = response ) => {
    try {
        
        let { limit, offset, nombre } = req.query;

        if ( !limit ) {
            limit = 10
        };

        if ( !offset ) {
            offset = 0
        };

        let where = {
            estado: true,
            ...( nombre && { nombre: { [ Op.like ]: `%${ nombre }%` } } ),
        };

        const areas = await Area.findAndCountAll({
            limit,
            offset,
            where
        });

        if ( areas.count === 0 ) {
            return res.status( 404 ).json({
                status: 404,
                msg: 'No hay registros de Areas en la base de datos'
            });
        }

        return res.status( 200 ).json({
            status: 200,
            areas
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

        const area = await Area.findOne( {
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

const postArea = async ( req = request, res = response ) => {
    try {
        
        const { body } = req;

        const area = await Area.create( body );

        return res.status( 200 ).json({
            status: 200,
            msg: 'Area creada',
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

const putArea = async ( req = request, res = response ) => {
    try {
        
        const { id } = req.params;
        const { nombre } = req.body;

        const area = await Area.findOne( { 
            where: { 
                id,
                estado: true
            } 
        });

        if ( nombre ) area.nombre = nombre;

        const updateArea = await area.save();        

        return res.status( 200 ).json({
            status: 200,
            msg: 'Área actualizada',
            updateArea
        });

    } catch ( error ) {
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

        const area = await Area.findOne( { 
            where: { 
                id,
                estado: true
            }
        });

        area.estado = false;

        const updateArea = await area.save();        

        return res.status( 200 ).json({
            status: 200,
            msg: 'Area eliminada',
            updateArea
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