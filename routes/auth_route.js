const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth_controller');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post( '/login', [    
    check( 'correo', 'Correo inválido' ).isEmail(),
    check( 'correo', 'El correo es obligatorio' ),
    check( 'contrasena', 'La contrasena es obligatoria' ).not().isEmpty(),
    validarCampos
], login);

module.exports = router;