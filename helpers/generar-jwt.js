const jwt = require('jsonwebtoken');

const generarJWT = async ( uid = '' ) => {

    // RETORNAR PROMESA
    return new Promise( ( resolve, reject ) => {
        // PAYLOAD = ID
        const payload = { uid };

        // GENERAR EL TOKEN CON EL PAYLOAD Y EL PRIVATEKEY
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '24h'
        }, ( err, token ) => {
            if ( err ) {
                console.log( err );
                reject( 'No se pudo generar el token' );
            } else {
                resolve( token );
            }
        });

    })
}


module.exports = {

    generarJWT

}