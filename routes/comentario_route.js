const { Router } = require('express');
const { check } = require('express-validator');

const { getComentarios,
        getComentario,
        postComentario,
        putComentario,
        deleteComentario } = require('../controllers/comentario_controller');

const router = Router();

// OBTENER TODOS LOS ComentarioS
router.get( '/', getComentarios);

// OBTENER UN Comentario
router.get( '/:id', getComentario);

// CREAR UN Comentario
router.post( '/', postComentario );

// ACTUALIZAR UN Comentario
router.put( '/:id', putComentario );

// ELIMINAR UN Comentario
router.delete( '/:id', deleteComentario );

module.exports = router;