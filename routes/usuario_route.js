const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios,
        getUsuario,
        postUsuario,
        putUsuario,
        deleteUsuario } = require('../controllers/usuario_controller');

const { existeCorreo,
        existeUsuario, 
        validarContrasena } = require('../helpers/db-validators');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// OBTENER TODOS LOS USUARIOS
router.get( '/', getUsuarios);

// OBTENER UN USUARIO
router.get( '/:id', [
    check( 'id' ).custom( existeUsuario ),
    validarCampos
], getUsuario);

// CREAR UN USUARIO
router.post( '/', [
    check( 'nombre', 'El nombre es obligatorio' ).exists(),
    check( 'apellidos', 'Los apellidos son obligatorios' ).exists(),
    check( 'correo', 'El correo es obligaotrio' ).exists(),
    check( 'correo', 'Este correo no es válido' ).isEmail(),
    check( 'correo' ).custom( existeCorreo ),
    check( 'contrasena', 'La contraseña es obligatoria' ).exists(),
    check( 'contrasena' ).custom( validarContrasena ),
    validarCampos
], postUsuario );

// ACTUALIZAR UN USUARIO
router.put( '/:id', [
    validarJWT,
    check( 'id' ).custom( existeUsuario ),    
    validarCampos
], putUsuario );

// ELIMINAR UN USUARIO
router.delete( '/:id', [
    validarJWT,
    check( 'id' ).custom( existeUsuario ),
    validarCampos
], deleteUsuario );

module.exports = router;