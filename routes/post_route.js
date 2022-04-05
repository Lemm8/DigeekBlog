const { Router } = require('express');
const { check } = require('express-validator');

const { getPosts,
        getPost,
        postPost,
        putPost,
        deletePost } = require('../controllers/post_controller');

const { existePost,
        existeUsuario,
        existeArea } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// OBTENER TODOS LOS POSTS
router.get( '/', getPosts);

// OBTENER UN POST
router.get( '/:id', [
    check( 'id' ).custom( existePost ),
    validarCampos
],getPost);

// CREAR UN POST
router.post( '/', [
    validarJWT,
    check( 'AreaId' ).exists(),
    check( 'AreaId' ).custom( existeArea ),
    check( 'titulo', 'El título es obligatorio' ).exists(),
    check( 'contenido', 'El contenido es obligatorio' ).exists(),
    validarCampos
],postPost );

// ACTUALIZAR UN POST
router.put( '/:id', [
    validarJWT,
    check( 'id' ).custom( existePost ),
    validarCampos
],putPost );

// ELIMINAR UN POST
router.delete( '/:id', [
    validarJWT,
    check( 'id' ).custom( existePost ),
    validarCampos
], deletePost );

module.exports = router;