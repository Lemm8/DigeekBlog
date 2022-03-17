const { Router } = require('express');
const { check } = require('express-validator');

const { getAreas,
        getArea,
        postArea,
        putArea,
        deleteArea } = require('../controllers/area_controller');

const router = Router();

// OBTENER TODOS LOS AreaS
router.get( '/', getAreas);

// OBTENER UN Area
router.get( '/:id', getArea);

// CREAR UN Area
router.post( '/', postArea );

// ACTUALIZAR UN Area
router.put( '/:id', putArea );

// ELIMINAR UN Area
router.delete( '/:id', deleteArea );

module.exports = router;