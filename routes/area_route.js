const { Router } = require('express');
const { check } = require('express-validator');

const { getAreas,
        getArea,
        postArea,
        putArea,
        deleteArea } = require('../controllers/area_controller');

const { existeArea } = require('../helpers/db-validators');

const { validarJWT } = require('../middlewares/validar-jwt');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// OBTENER TODOS LOS AreaS
router.get( '/', getAreas);

// OBTENER UN Area
router.get( '/:id', [
    check( 'id' ).custom( existeArea ),
    validarCampos
], getArea);

// CREAR UN Area
router.post( '/', [
    validarJWT,
    check( 'nombre', 'El nombre es obligatorio' ).exists(),
    validarCampos
], postArea );

// ACTUALIZAR UN Area
router.put( '/:id', [
    validarJWT,
    check( 'id' ).custom( existeArea ),
    validarCampos
], putArea );

// ELIMINAR UN Area
router.delete( '/:id', [
    validarJWT,
    check( 'id' ).custom( existeArea ),
    validarCampos
], deleteArea );

module.exports = router;