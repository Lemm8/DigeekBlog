const { Router } = require('express');

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if ( req.file.fieldname === 'content' ) {
            cb(null, path.join(__dirname, '../public/posts/'));
        } 
        if ( req.file.fieldname === 'uploadedImages' ) {
            cb(null, path.join(__dirname, '../public/imgs/'));
        }        
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0]);
    }
});

const multi_upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        if ( file.fieldname === 'content' ) {
            if ( file.mimetype === "text/plain" ) {
                cb(null, true);
            } else  {
                cb(null, false);
                const err = new Error('Only .png, .jpg and .jpeg format allowed!')
                err.name = 'ExtensionError'
                return cb(err);
            }
        }
        if ( file.fieldname === 'uploadedImages' ) {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"  ) {
                cb(null, true);
            } else {
                cb(null, false);
                const err = new Error('Only .png, .jpg and .jpeg format allowed!')
                err.name = 'ExtensionError'
                return cb(err);
            }
        }
    },
}).fields([{
    name: 'content', maxCount: 1
}, {
    name: 'uploadedImages', maxCount: 2
}]);

const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post( '/', validarJWT , multi_upload, ( req, res ) => {
    multi_upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end();
            return;
        } else if (err) {
            // An unknown error occurred when uploading.
            if (err.name == 'ExtensionError') {
                res.status(413).send({ error: { message: err.message } }).end();
            } else {
                res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
            }
            return;
        }
        // Everything went fine.
        // show file `req.files`
        // show body `req.body`
        res.status(200).end('Your files uploaded.');
    })
});

module.exports = router;