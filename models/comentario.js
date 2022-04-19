const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db/connection');
const Usuario = require('./usuario');
const Post = require('./post');

class Comentario extends Model {}

Comentario.init({
  
  contenido: {
    type: DataTypes.STRING,
    allowNull: false
  },

  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }

}, {

  tableName: 'comentarios',
  sequelize: db, // We need to pass the connection instance
  modelName: 'Comentario', // We need to choose the model name
  defaultScope: {
    where: {
      estado: true,      
    },
    attributes: {
      exclude: [ 'UsuarioId', 'PostId' ]
    },
    include: [{
      model: Usuario,
      as: 'Usuario',
      required: true,
      attributes: {
        exclude: [ 'createdAt', 'updatedAt' ]
      }
    }, {
      model: Post,
      as: 'Post',
      required: true,
      attributes: {
        exclude: [ 'createdAt', 'updatedAt', 'UsuarioId', 'AreaId' ]
      }
    }]
  }

});

// the defined model is the class itself
console.log(Comentario === db.models.Comentario); // true

module.exports = Comentario;