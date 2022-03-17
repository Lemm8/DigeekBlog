const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db/connection');

class Usuario extends Model {}

Usuario.init({
  
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },

  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  },

  correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
  }

}, {

  tableName: 'usuarios',
  sequelize: db, // We need to pass the connection instance
  modelName: 'Usuario' // We need to choose the model name

});

// the defined model is the class itself
console.log(Usuario === db.models.Usuario); // true

module.exports = Usuario;