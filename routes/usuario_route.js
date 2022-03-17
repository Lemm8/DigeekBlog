const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios,
        getUsuario,
        postUsuario,
        putUsuario,
        deleteUsuario } = require('../controllers/usuario_controller');

const router = Router();

// OBTENER TODOS LOS USUARIOS
router.get( '/', getUsuarios);

// OBTENER UN USUARIO
router.get( '/:id', getUsuario);

// CREAR UN USUARIO
router.post( '/', postUsuario );

// ACTUALIZAR UN USUARIO
router.put( '/:id', putUsuario );

// ELIMINAR UN USUARIO
router.delete( '/:id', deleteUsuario );

module.exports = router;