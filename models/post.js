const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db/connection');

class Post extends Model {}

Post.init({
  
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },

  contenido: {
    type: DataTypes.STRING,
    allowNull: false
  },

  imagen: {
      type: DataTypes.STRING,
      allowNull: true,
  }

}, {

  tableName: 'posts',
  sequelize: db, // We need to pass the connection instance
  modelName: 'Post' // We need to choose the model name

});

// the defined model is the class itself
console.log(Post === db.models.Post); // true

module.exports = Post;