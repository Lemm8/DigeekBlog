const { Router } = require('express');
const { check } = require('express-validator');

const { getComentarios,
        getComentario,
        postComentario,
        putComentario,
        deleteComentario } = require('../controllers/comentario_controller');

const { existePost,
        existeUsuario,
        existeComentario } = require('../helpers/db-validators');
    
const { validarCampos } = require('../middlewares/validar-campos');
            
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// OBTENER TODOS LOS ComentarioS
router.get( '/', getComentarios);

// OBTENER UN Comentario
router.get( '/:id', [
    check( 'id' ).custom( existeComentario ),
    validarCampos
], getComentario);

// CREAR UN Comentario
router.post( '/', [
    validarJWT,
    check( 'PostId' ).exists(),
    check( 'PostId' ).custom( existePost ),
    check( 'contenido' ).exists(),
    validarCampos
], postComentario );

// ACTUALIZAR UN Comentario
router.put( '/:id', [
    validarJWT,
    check( 'id' ).custom( existeComentario ),
    validarCampos
], putComentario );

// ELIMINAR UN Comentario
router.delete( '/:id', [
    validarJWT,
    check( 'id' ).custom( existeComentario ),
    validarCampos
], deleteComentario );

module.exports = router;