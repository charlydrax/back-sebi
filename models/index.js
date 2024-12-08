//configuration de sequelize
const { Sequelize } = require('sequelize');
require('dotenv').config();
//connexion bdd avec infos
const sequelize = new Sequelize(process.env.DATABASE_NAME,
    process.env.ID_DATABASE,
    process.env.PASSWORD_DATABASE,
    {    dialect: process.env.DIALECT_DATABASE,
        host: process.env.HOST_DATABSE
    });

module.exports = sequelize ;