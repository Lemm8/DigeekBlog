const bcryptjs = require('bcryptjs');

// ENCRIPTAR CONTRASEÑA  -  10 VUELTAS POR DEFECTO
const encriptarContrasena = ( contrasena = '' ) => {    
    const salt = bcryptjs.genSaltSync();
    const hash_contrasena = bcryptjs.hashSync( contrasena, salt );
    return hash_contrasena;
}


module.exports = {
    encriptarContrasena
}