const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db/connection');

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
  modelName: 'Comentario' // We need to choose the model name

});

// the defined model is the class itself
console.log(Comentario === db.models.Comentario); // true

module.exports = Comentario;