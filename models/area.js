const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../db/connection');

class Area extends Model {}

Area.init({
  
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },

}, {
  tableName: 'Areas',
  sequelize: db, // We need to pass the connection instance
  modelName: 'Area' // We need to choose the model name

});

// the defined model is the class itself
console.log(Area === db.models.Area); // true

module.exports = Area;