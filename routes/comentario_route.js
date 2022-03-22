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
    check( 'UsuarioId' ).exists(),
    check( 'UsuarioId' ).custom( existeUsuario ),
    check( 'PostId' ).exists(),
    check( 'PostId' ).custom( existePost ),
    check( 'contenido' ).exists(),
    validarCampos
], postComentario );

// ACTUALIZAR UN Comentario
router.put( '/:id', [
    check( 'id' ).custom( existeComentario ),
    validarCampos
], putComentario );

// ELIMINAR UN Comentario
router.delete( '/:id', [
    check( 'id' ).custom( existeComentario ),
    validarCampos
], deleteComentario );

module.exports = router;