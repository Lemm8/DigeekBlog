const { Sequelize } = require('sequelize');


const db = new Sequelize( process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    //logging: false
});


module.exports = db;
