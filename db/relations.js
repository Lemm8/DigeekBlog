const Usuario = require('../models/usuario');
const Post = require('../models/post');
const Comentario = require('../models/comentario');
const Area = require('../models/area')

// UNO A VARIOS 
Usuario.hasMany( Post, {
    onDelete: 'CASCADE'
})
Post.belongsTo( Usuario, {
    onDelete: 'CASCADE',
    as: 'Usuario'
});

// UNO A UNO 
Area.hasOne( Post, {
    onDelete: 'CASCADE',    
});
Post.belongsTo( Area, {
    onDelete: 'CASCADE',
    as: 'Area'
});

// UNO A VARIOS 
Post.hasMany( Comentario, {
    onDelete: 'CASCADE'
});
Comentario.belongsTo( Post, {
    onDelete: 'CASCADE',
    as: 'Post'
})

// UNO A VARIOS
Usuario.hasMany( Comentario, {
    onDelete: 'CASCADE'
});
Comentario.belongsTo( Usuario, {
    onDelete: 'CASCADE',
    as: 'Usuario'
});
