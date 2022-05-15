const { Router } = require('express');
const { postArticulo } = require('../controllers/post_controller');

const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post( '/', [ validarJWT ], postArticulo);

module.exports = router;