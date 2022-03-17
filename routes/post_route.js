const { Router } = require('express');
const { check } = require('express-validator');

const { getPosts,
        getPost,
        postPost,
        putPost,
        deletePost } = require('../controllers/post_controller');

const router = Router();

// OBTENER TODOS LOS PostS
router.get( '/', getPosts);

// OBTENER UN Post
router.get( '/:id', getPost);

// CREAR UN Post
router.post( '/', postPost );

// ACTUALIZAR UN Post
router.put( '/:id', putPost );

// ELIMINAR UN Post
router.delete( '/:id', deletePost );

module.exports = router;