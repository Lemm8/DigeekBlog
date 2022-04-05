const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db/connection');
const Area = require('./Area');
const Usuario = require('./usuario');

class Post extends Model {}

Post.init({
  
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },

  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  imagen: {
      type: DataTypes.STRING,
      allowNull: true,
  },

  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }

}, {

  tableName: 'posts',
  sequelize: db, // We need to pass the connection instance
  modelName: 'Post', // We need to choose the model name
  defaultScope: {
    where: {
      estado: true,      
    },
    include: [{
      model: Usuario,
      as: 'Usuario',
      required: true
    }, {
      model: Area,
      as: 'Area',
      required: true
    }]
  }

});

// the defined model is the class itself
console.log(Post === db.models.Post); // true

module.exports = Post;