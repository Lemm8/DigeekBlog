const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db/connection');
const bcryptjs = require('bcryptjs');
const { encriptarContrasena } = require('../helpers/encriptar');

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
  },

  contrasena: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
  }

}, {

  tableName: 'usuarios',
  sequelize: db, // We need to pass the connection instance
  modelName: 'Usuario', // We need to choose the model name
  hooks: {
    beforeCreate: ( usuario ) => {
      usuario.contrasena = encriptarContrasena( usuario.contrasena )
    }
  }

});

// the defined model is the class itself
console.log(Usuario === db.models.Usuario); // true

module.exports = Usuario;